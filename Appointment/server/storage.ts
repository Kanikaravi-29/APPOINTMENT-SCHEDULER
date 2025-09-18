import { type User, type InsertUser, type Doctor, type InsertDoctor, type Appointment, type InsertAppointment } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getDoctors(): Promise<Doctor[]>;
  getDoctor(id: string): Promise<Doctor | undefined>;
  getDoctorByName(name: string): Promise<Doctor | undefined>;
  createDoctor(doctor: InsertDoctor): Promise<Doctor>;
  
  getAppointments(): Promise<Appointment[]>;
  getAppointment(id: string): Promise<Appointment | undefined>;
  getAppointmentByAppointmentId(appointmentId: string): Promise<Appointment | undefined>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  updateAppointment(id: string, appointment: Partial<Appointment>): Promise<Appointment | undefined>;
  checkDoctorAvailability(doctorId: string, date: string, time: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private doctors: Map<string, Doctor>;
  private appointments: Map<string, Appointment>;

  constructor() {
    this.users = new Map();
    this.doctors = new Map();
    this.appointments = new Map();
    
    // Initialize with sample doctors
    this.initializeSampleDoctors();
  }

  private async initializeSampleDoctors() {
    const sampleDoctors = [
      { name: "Dr. Sarah Johnson", specialty: "Family Medicine", email: "sarah.johnson@medicare.com" },
      { name: "Dr. Michael Chen", specialty: "Cardiology", email: "michael.chen@medicare.com" },
      { name: "Dr. Emily Rodriguez", specialty: "Dermatology", email: "emily.rodriguez@medicare.com" },
      { name: "Dr. James Wilson", specialty: "Orthopedics", email: "james.wilson@medicare.com" },
      { name: "Dr. Lisa Martinez", specialty: "Pediatrics", email: "lisa.martinez@medicare.com" },
    ];

    for (const doctor of sampleDoctors) {
      await this.createDoctor(doctor);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getDoctors(): Promise<Doctor[]> {
    return Array.from(this.doctors.values());
  }

  async getDoctor(id: string): Promise<Doctor | undefined> {
    return this.doctors.get(id);
  }

  async getDoctorByName(name: string): Promise<Doctor | undefined> {
    return Array.from(this.doctors.values()).find(
      (doctor) => doctor.name === name,
    );
  }

  async createDoctor(insertDoctor: InsertDoctor): Promise<Doctor> {
    const id = randomUUID();
    const doctor: Doctor = { ...insertDoctor, id, available: true };
    this.doctors.set(id, doctor);
    return doctor;
  }

  async getAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values());
  }

  async getAppointment(id: string): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }

  async getAppointmentByAppointmentId(appointmentId: string): Promise<Appointment | undefined> {
    return Array.from(this.appointments.values()).find(
      (appointment) => appointment.appointmentId === appointmentId,
    );
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = randomUUID();
    const appointmentId = this.generateAppointmentId();
    const appointment: Appointment = { 
      ...insertAppointment, 
      id, 
      appointmentId,
      status: "confirmed",
      confirmedDate: insertAppointment.preferredDate,
      confirmedTime: insertAppointment.preferredTime,
      createdAt: new Date(),
    };
    this.appointments.set(id, appointment);
    return appointment;
  }

  async updateAppointment(id: string, updateData: Partial<Appointment>): Promise<Appointment | undefined> {
    const appointment = this.appointments.get(id);
    if (!appointment) return undefined;
    
    const updatedAppointment = { ...appointment, ...updateData };
    this.appointments.set(id, updatedAppointment);
    return updatedAppointment;
  }

  async checkDoctorAvailability(doctorId: string, date: string, time: string): Promise<boolean> {
    const existingAppointments = Array.from(this.appointments.values()).filter(
      (appointment) => 
        appointment.doctorId === doctorId && 
        appointment.confirmedDate === date && 
        appointment.confirmedTime === time &&
        appointment.status === "confirmed"
    );
    
    return existingAppointments.length === 0;
  }

  private generateAppointmentId(): string {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    return `APT-${year}-${randomNum}`;
  }
}

export const storage = new MemStorage();
