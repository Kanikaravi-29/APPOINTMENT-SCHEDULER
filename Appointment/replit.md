# MediCare Clinic - AI-Powered Appointment Scheduling

## Overview

MediCare Clinic is a comprehensive healthcare appointment scheduling system that leverages AI technology to streamline the booking process. The application features an intelligent appointment request processor that analyzes patient needs and matches them with appropriate specialists. Built as a full-stack web application, it combines a React-based frontend with an Express.js backend, integrated with external automation workflows for complete appointment lifecycle management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side navigation
- **Styling**: TailwindCSS with Shadcn/UI component library for consistent healthcare-focused design
- **State Management**: TanStack Query for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for robust form validation
- **Build System**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Data Storage**: In-memory storage implementation with fallback to database
- **API Design**: RESTful endpoints for appointment management and doctor information
- **AI Integration**: OpenAI GPT-4o for intelligent appointment request processing
- **Session Management**: Express sessions with PostgreSQL session store

### Database Schema Design
- **Users Table**: Authentication and user management
- **Doctors Table**: Healthcare provider information with specialties
- **Appointments Table**: Comprehensive appointment tracking with status management
- **Relationships**: Foreign key constraints linking appointments to doctors

### Authentication & Authorization
- Session-based authentication using Express sessions
- PostgreSQL session storage for persistence
- Environment-based configuration for security credentials

## External Dependencies

### AI Services
- **OpenAI API**: GPT-4o model for intelligent appointment request analysis and specialist matching
- **Processing Capabilities**: Natural language understanding for appointment requests and specialty recommendations

### Database Services  
- **PostgreSQL**: Primary database for persistent data storage
- **Neon Database**: Cloud PostgreSQL provider integration via connection string
- **Drizzle Kit**: Database migration and schema management

### Automation Platform
- **n8n Workflows**: Complete appointment lifecycle automation including:
  - Webhook endpoints for appointment requests
  - AI processing integration
  - Email/SMS notification systems
  - Automated reminder scheduling
  - Optional voice confirmation services

### Communication Services
- **Email Integration**: SMTP-based email notifications for confirmations and reminders  
- **SMS Integration**: Twilio for text message notifications
- **Voice Services**: Optional integration with Retell AI or ElevenLabs for voice confirmations

### Infrastructure Dependencies
- **AWS DynamoDB**: Real-time availability checking and data storage (as referenced in documentation)
- **Environment Variables**: Secure configuration management for API keys and database credentials
- **Session Storage**: Connect-pg-simple for PostgreSQL session management