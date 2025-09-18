import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Confirmation() {
  const { appointmentId } = useParams();

  const { data: appointment, isLoading, error } = useQuery({
    queryKey: ['/api/appointments', appointmentId],
    enabled: !!appointmentId,
  });

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return 'Not specified';
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (!appointmentId) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertDescription>
            No appointment ID provided. Please check your confirmation email or try booking again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <i className="fas fa-heartbeat text-medical-blue text-2xl"></i>
              <span className="text-xl font-bold text-slate-900">MediCare Clinic</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-slate-600 hover:text-medical-blue transition-colors">Home</Link>
              <Link href="/services" className="text-slate-600 hover:text-medical-blue transition-colors">Services</Link>
              <Link href="/doctors" className="text-slate-600 hover:text-medical-blue transition-colors">Doctors</Link>
              <Link href="/contact" className="text-slate-600 hover:text-medical-blue transition-colors">Contact</Link>
              <Link href="/booking" className="bg-medical-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Book Appointment
              </Link>
            </div>
            <button className="md:hidden text-slate-600 hover:text-medical-blue">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </nav>

      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <Alert className="mb-8 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                Failed to load appointment details. Please check your appointment ID or contact support.
              </AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <div className="space-y-8">
              <div className="text-center">
                <Skeleton className="w-24 h-24 rounded-full mx-auto mb-6" />
                <Skeleton className="h-8 w-64 mx-auto mb-4" />
                <Skeleton className="h-6 w-96 mx-auto" />
              </div>
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-48" />
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-4 w-36" />
                      </div>
                      <div className="space-y-3">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-4 w-36" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : appointment ? (
            <>
              {/* Success Header */}
              <div className="text-center mb-12">
                <div className="w-24 h-24 bg-healthcare-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-check text-white text-3xl"></i>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Appointment Confirmed!
                </h1>
                <p className="text-xl text-slate-600">
                  Your appointment has been successfully scheduled. We've sent confirmation details to your email.
                </p>
              </div>

              {/* Appointment Details Card */}
              <Card className="shadow-xl mb-8">
                <CardContent className="p-8 lg:p-12">
                  <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                    <i className="fas fa-calendar-check text-healthcare-green mr-3"></i>
                    Appointment Details
                  </h2>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Patient Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">
                        Patient Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Name:</span>
                          <span className="font-medium text-slate-900">{appointment.patientName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Email:</span>
                          <span className="font-medium text-slate-900">{appointment.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Phone:</span>
                          <span className="font-medium text-slate-900">{appointment.phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Appointment Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">
                        Appointment Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Date:</span>
                          <span className="font-medium text-slate-900">{formatDate(appointment.confirmedDate || appointment.preferredDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Time:</span>
                          <span className="font-medium text-slate-900">{formatTime(appointment.confirmedTime || appointment.preferredTime)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Doctor:</span>
                          <span className="font-medium text-slate-900">{appointment.doctor?.name || "To be assigned"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Specialty:</span>
                          <span className="font-medium text-slate-900">{appointment.doctor?.specialty || "General"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Appointment ID */}
                  <div className="mt-8 p-4 bg-slate-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Appointment ID:</span>
                      <span className="font-mono font-bold text-medical-blue">{appointment.appointmentId}</span>
                    </div>
                  </div>

                  {/* Reason for Visit */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Reason for Visit</h3>
                    <p className="text-slate-600 bg-slate-50 p-4 rounded-lg">
                      {appointment.reasonForVisit}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card className="shadow-lg mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <i className="fas fa-list-check text-medical-blue mr-3"></i>
                    What Happens Next?
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-healthcare-green rounded-full flex items-center justify-center mr-4 mt-1">
                        <i className="fas fa-envelope text-white text-sm"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">Email Confirmation Sent</h3>
                        <p className="text-slate-600">You'll receive a detailed confirmation email with all appointment information.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-medical-blue rounded-full flex items-center justify-center mr-4 mt-1">
                        <i className="fas fa-sms text-white text-sm"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">SMS Reminders</h3>
                        <p className="text-slate-600">We'll send you reminders 24 hours and 1 hour before your appointment.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-professional-purple rounded-full flex items-center justify-center mr-4 mt-1">
                        <i className="fas fa-phone text-white text-sm"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">Optional Voice Confirmation</h3>
                        <p className="text-slate-600">Our AI assistant may call you to confirm appointment details and answer any questions.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Important Information */}
              <Card className="bg-amber-50 border-amber-200 mb-8">
                <CardContent className="p-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                    <i className="fas fa-exclamation-triangle text-amber-600 mr-3"></i>
                    Important Information
                  </h2>
                  <div className="space-y-3 text-slate-700">
                    <p><strong>Arrival Time:</strong> Please arrive 15 minutes early for check-in and paperwork.</p>
                    <p><strong>Bring With You:</strong> Valid photo ID, insurance card, and list of current medications.</p>
                    <p><strong>Cancellation Policy:</strong> Please provide at least 24 hours notice for cancellations.</p>
                    <p><strong>COVID-19:</strong> Masks are required in all clinical areas.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button className="bg-medical-blue hover:bg-blue-700 text-white px-8 py-3">
                    <i className="fas fa-home mr-2"></i>
                    Back to Home
                  </Button>
                </Link>
                <Link href="/booking">
                  <Button variant="outline" className="border-medical-blue text-medical-blue hover:bg-blue-50 px-8 py-3">
                    <i className="fas fa-plus mr-2"></i>
                    Book Another Appointment
                  </Button>
                </Link>
                <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3">
                  <i className="fas fa-calendar-plus mr-2"></i>
                  Add to Calendar
                </Button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
