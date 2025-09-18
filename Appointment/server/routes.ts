import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAppointmentSchema } from "@shared/schema";
import { processAppointmentRequest } from "./services/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all doctors
  app.get("/api/doctors", async (req, res) => {
    try {
      const doctors = await storage.getDoctors();
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch doctors" });
    }
  });

  // Create appointment (from n8n webhook or direct form submission)
  app.post("/api/appointments", async (req, res) => {
    try {
      const validatedData = insertAppointmentSchema.parse(req.body);
      
      // Process appointment request with AI
      const processedRequest = await processAppointmentRequest(validatedData);
      
      // Find appropriate doctor
      let selectedDoctor;
      if (validatedData.doctorPreference) {
        // Try to find specific doctor preference
        const doctors = await storage.getDoctors();
        selectedDoctor = doctors.find(d => 
          d.name.toLowerCase().includes(validatedData.doctorPreference!.toLowerCase()) ||
          d.specialty.toLowerCase().includes(processedRequest.suggestedSpecialty.toLowerCase())
        );
      }
      
      if (!selectedDoctor) {
        // Find doctor by specialty
        const doctors = await storage.getDoctors();
        selectedDoctor = doctors.find(d => 
          d.specialty.toLowerCase() === processedRequest.suggestedSpecialty.toLowerCase()
        ) || doctors[0]; // Fallback to first available doctor
      }

      // Check availability
      const isAvailable = await storage.checkDoctorAvailability(
        selectedDoctor.id, 
        processedRequest.requestedDate, 
        processedRequest.requestedTime
      );

      if (!isAvailable) {
        return res.status(409).json({ 
          message: "The requested time slot is not available. Please choose a different time.",
          availableSlots: [] // In a real app, you'd fetch available slots
        });
      }

      // Create appointment
      const appointmentData = {
        ...validatedData,
        doctorId: selectedDoctor.id,
        preferredDate: processedRequest.requestedDate,
        preferredTime: processedRequest.requestedTime,
        reasonForVisit: processedRequest.reasonForVisit,
      };

      const appointment = await storage.createAppointment(appointmentData);
      
      // Return appointment details with doctor info
      const response = {
        ...appointment,
        doctor: selectedDoctor,
        aiProcessing: {
          suggestedSpecialty: processedRequest.suggestedSpecialty,
          priority: processedRequest.priority
        }
      };

      res.status(201).json(response);
    } catch (error) {
      console.error("Error creating appointment:", error);
      if (error.issues) {
        // Zod validation error
        res.status(400).json({ 
          message: "Invalid appointment data", 
          errors: error.issues 
        });
      } else {
        res.status(500).json({ message: "Failed to create appointment" });
      }
    }
  });

  // Get appointment by ID
  app.get("/api/appointments/:appointmentId", async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const appointment = await storage.getAppointmentByAppointmentId(appointmentId);
      
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }

      // Get doctor details
      const doctor = await storage.getDoctor(appointment.doctorId!);
      
      res.json({
        ...appointment,
        doctor
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch appointment" });
    }
  });

  // Get all appointments (admin endpoint)
  app.get("/api/appointments", async (req, res) => {
    try {
      const appointments = await storage.getAppointments();
      const doctors = await storage.getDoctors();
      
      // Enhance appointments with doctor data
      const enhancedAppointments = appointments.map(apt => ({
        ...apt,
        doctor: doctors.find(d => d.id === apt.doctorId)
      }));
      
      res.json(enhancedAppointments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch appointments" });
    }
  });

  // Check doctor availability
  app.post("/api/availability/check", async (req, res) => {
    try {
      const { doctorId, date, time } = req.body;
      const isAvailable = await storage.checkDoctorAvailability(doctorId, date, time);
      res.json({ available: isAvailable });
    } catch (error) {
      res.status(500).json({ message: "Failed to check availability" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
