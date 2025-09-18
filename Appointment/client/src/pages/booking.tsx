import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { insertAppointmentSchema, type InsertAppointment, type Doctor } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function Booking() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  const form = useForm<InsertAppointment>({
    resolver: zodResolver(insertAppointmentSchema),
    defaultValues: {
      patientName: "",
      email: "",
      phone: "",
      preferredDate: "",
      preferredTime: "",
      doctorPreference: "no-preference",
      reasonForVisit: "",
    },
  });

  // Fetch doctors for the dropdown
  const { data: doctors = [] } = useQuery<Doctor[]>({
    queryKey: ['/api/doctors'],
  });

  const appointmentMutation = useMutation({
    mutationFn: async (data: InsertAppointment) => {
      const response = await apiRequest("POST", "/api/appointments", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Appointment Booked Successfully!",
        description: `Your appointment has been scheduled for ${data.confirmedDate} at ${data.confirmedTime}`,
      });
      setLocation(`/confirmation/${data.appointmentId}`);
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to book appointment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertAppointment) => {
    // Convert "no-preference" back to empty string for backend processing
    const submitData = {
      ...data,
      doctorPreference: data.doctorPreference === "no-preference" ? "" : data.doctorPreference
    };
    appointmentMutation.mutate(submitData);
  };

  // Get today's date for min date validation
  const today = new Date().toISOString().split('T')[0];

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
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Book Your Appointment
            </h1>
            <p className="text-xl text-slate-600">
              Fill out the form below and our AI system will find the perfect appointment slot for you.
            </p>
          </div>

          {/* Booking Form */}
          <Card className="shadow-xl">
            <CardContent className="p-8 lg:p-12">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900 flex items-center">
                      <i className="fas fa-user text-medical-blue mr-3"></i>
                      Personal Information
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="patientName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Appointment Details */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900 flex items-center">
                      <i className="fas fa-calendar text-medical-blue mr-3"></i>
                      Appointment Details
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="preferredDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Date *</FormLabel>
                            <FormControl>
                              <Input type="date" min={today} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="preferredTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Time *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a time" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="09:00">9:00 AM</SelectItem>
                                <SelectItem value="09:30">9:30 AM</SelectItem>
                                <SelectItem value="10:00">10:00 AM</SelectItem>
                                <SelectItem value="10:30">10:30 AM</SelectItem>
                                <SelectItem value="11:00">11:00 AM</SelectItem>
                                <SelectItem value="11:30">11:30 AM</SelectItem>
                                <SelectItem value="14:00">2:00 PM</SelectItem>
                                <SelectItem value="14:30">2:30 PM</SelectItem>
                                <SelectItem value="15:00">3:00 PM</SelectItem>
                                <SelectItem value="15:30">3:30 PM</SelectItem>
                                <SelectItem value="16:00">4:00 PM</SelectItem>
                                <SelectItem value="16:30">4:30 PM</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="doctorPreference"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Doctor Preference</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value || "no-preference"}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="No preference / Let AI choose" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="no-preference">No preference / Let AI choose</SelectItem>
                              {doctors.map((doctor) => (
                                <SelectItem key={doctor.id} value={doctor.name}>
                                  {doctor.name} - {doctor.specialty}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="reasonForVisit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reason for Visit *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please describe your symptoms, concerns, or the reason for your visit. This helps our AI system match you with the right specialist."
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* AI Processing Notice */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-start">
                      <i className="fas fa-info-circle text-medical-blue text-xl mr-3 mt-1"></i>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">AI-Powered Scheduling</h4>
                        <p className="text-slate-600 text-sm">
                          Our AI system will analyze your request and automatically find the best available appointment slot with the most suitable doctor based on your needs. You'll receive instant confirmation via email and SMS.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button 
                      type="submit" 
                      className="w-full bg-medical-blue hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold h-auto"
                      disabled={appointmentMutation.isPending}
                    >
                      {appointmentMutation.isPending ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Processing...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-calendar-check mr-2"></i>
                          Book Appointment with AI
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Terms */}
                  <div className="text-center text-sm text-slate-600">
                    By booking an appointment, you agree to our{" "}
                    <a href="#" className="text-medical-blue hover:underline">Terms of Service</a> and{" "}
                    <a href="#" className="text-medical-blue hover:underline">Privacy Policy</a>.
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mt-12 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center">
                Need Help? Contact Us
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <i className="fas fa-phone text-medical-blue text-2xl mb-3"></i>
                  <p className="font-medium text-slate-900">Phone</p>
                  <p className="text-slate-600">(555) 123-4567</p>
                </div>
                <div>
                  <i className="fas fa-envelope text-medical-blue text-2xl mb-3"></i>
                  <p className="font-medium text-slate-900">Email</p>
                  <p className="text-slate-600">appointments@medicare.com</p>
                </div>
                <div>
                  <i className="fas fa-clock text-medical-blue text-2xl mb-3"></i>
                  <p className="font-medium text-slate-900">Hours</p>
                  <p className="text-slate-600">Mon-Fri: 8AM-6PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
