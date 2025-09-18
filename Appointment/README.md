# MediCare Clinic - AI-Powered Appointment Scheduling

A complete healthcare appointment scheduling system powered by AI, built with React, Express, and integrated with n8n automation workflows.

## Features

- **AI-Powered Scheduling**: OpenAI GPT-4o analyzes appointment requests and matches patients with appropriate specialists
- **Real-time Availability**: DynamoDB integration for instant availability checking
- **Multi-channel Notifications**: Email, SMS, and optional voice confirmations
- **Responsive Design**: Mobile-first UI built with TailwindCSS
- **Automated Reminders**: 24-hour and 1-hour appointment reminders
- **Professional Healthcare UI**: Clean, accessible design optimized for medical practices

## Tech Stack

### Frontend
- React 18 with TypeScript
- Wouter for routing
- TailwindCSS for styling
- Shadcn/UI components
- React Hook Form with Zod validation
- TanStack Query for data fetching

### Backend
- Node.js with Express
- AWS DynamoDB for data storage
- OpenAI API for intelligent request processing
- Environment-based configuration

### Automation
- n8n workflow for complete appointment lifecycle
- Email/SMS integration via SMTP and Twilio
- Optional voice confirmation with Retell AI/ElevenLabs

## Quick Start

### Prerequisites
- Node.js 18+
- AWS Account (for DynamoDB)
- OpenAI API Key
- Email service (SMTP)
- SMS service (Twilio)
- n8n instance

### Installation

1. **Clone and install dependencies**
```bash
npm install
