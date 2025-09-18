import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export interface AppointmentRequest {
  patientName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  doctorPreference?: string;
  reasonForVisit: string;
}

export interface ProcessedAppointmentRequest {
  patientName: string;
  email: string;
  phone: string;
  requestedDate: string;
  requestedTime: string;
  doctorPreference: string;
  reasonForVisit: string;
  suggestedSpecialty?: string;
  priority?: string;
}

export async function processAppointmentRequest(request: AppointmentRequest): Promise<ProcessedAppointmentRequest> {
  try {
    const prompt = `You are an AI assistant for a healthcare clinic. The input will be a patient's appointment request with details like date, time, and doctor preference. 

Analyze the reason for visit and extract relevant information. Based on the reason for visit, suggest the most appropriate medical specialty if no doctor preference is given.

Available specialties: Family Medicine, Cardiology, Dermatology, Orthopedics, Pediatrics.

Extract and return data in JSON format with the following fields:
- patientName: string
- email: string  
- phone: string
- requestedDate: string (in YYYY-MM-DD format)
- requestedTime: string (in HH:MM format)
- doctorPreference: string (use provided preference or suggest "Family Medicine" as default)
- reasonForVisit: string (cleaned up and professional)
- suggestedSpecialty: string (based on symptoms/reason)
- priority: string (low/medium/high based on urgency indicators)

Patient request: ${JSON.stringify(request)}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a healthcare appointment processing AI. Always respond with valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      patientName: result.patientName || request.patientName,
      email: result.email || request.email,
      phone: result.phone || request.phone,
      requestedDate: result.requestedDate || request.preferredDate,
      requestedTime: result.requestedTime || request.preferredTime,
      doctorPreference: result.doctorPreference || "Family Medicine",
      reasonForVisit: result.reasonForVisit || request.reasonForVisit,
      suggestedSpecialty: result.suggestedSpecialty || "Family Medicine",
      priority: result.priority || "medium"
    };
  } catch (error) {
    console.error("Failed to process appointment request with AI:", error);
    // Fallback to basic processing
    return {
      patientName: request.patientName,
      email: request.email,
      phone: request.phone,
      requestedDate: request.preferredDate,
      requestedTime: request.preferredTime,
      doctorPreference: request.doctorPreference || "Family Medicine",
      reasonForVisit: request.reasonForVisit,
      suggestedSpecialty: "Family Medicine",
      priority: "medium"
    };
  }
}
