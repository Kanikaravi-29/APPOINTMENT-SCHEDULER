import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "general",
      message: "",
    },
  });

  const onSubmit = (data: ContactForm) => {
    // Simulate form submission
    console.log("Contact form submitted:", data);
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    form.reset();
  };

  const contactInfo = [
    {
      icon: "fas fa-map-marker-alt",
      title: "Visit Us",
      details: ["123 Health Street", "Medical District", "City, State 12345"],
      color: "medical-blue"
    },
    {
      icon: "fas fa-phone",
      title: "Call Us",
      details: ["Main: (555) 123-4567", "Emergency: (555) 911-HELP", "Available 24/7"],
      color: "healthcare-green"
    },
    {
      icon: "fas fa-envelope",
      title: "Email Us",
      details: ["info@medicare.com", "appointments@medicare.com", "emergency@medicare.com"],
      color: "professional-purple"
    },
    {
      icon: "fas fa-clock",
      title: "Hours",
      details: ["Mon-Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 4:00 PM", "Sun: Emergency Only"],
      color: "orange-500"
    }
  ];

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
              <Link href="/contact" className="text-medical-blue font-medium">Contact</Link>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Get in touch with our healthcare team. We're here to answer your questions and help you with your medical needs.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 bg-${info.color} rounded-lg flex items-center justify-center mb-4`}>
                        <i className={`${info.icon} text-white text-xl`}></i>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-3">{info.title}</h3>
                      <div className="space-y-1">
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-slate-600">{detail}</p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Emergency Notice */}
              <Card className="mt-6 bg-red-50 border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <i className="fas fa-exclamation-triangle text-red-600 text-xl mr-3 mt-1"></i>
                    <div>
                      <h3 className="font-semibold text-red-900 mb-2">Medical Emergency?</h3>
                      <p className="text-red-800 text-sm mb-3">
                        If you're experiencing a medical emergency, please call 911 immediately or visit your nearest emergency room.
                      </p>
                      <Button className="bg-red-600 hover:bg-red-700 text-white text-sm">
                        <i className="fas fa-phone mr-2"></i>
                        Call 911
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl">
                <CardContent className="p-8 lg:p-12">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Send Us a Message</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
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

                      <div className="grid md:grid-cols-2 gap-6">
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
                        
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a subject" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="general">General Inquiry</SelectItem>
                                  <SelectItem value="appointment">Appointment Question</SelectItem>
                                  <SelectItem value="billing">Billing & Insurance</SelectItem>
                                  <SelectItem value="medical">Medical Question</SelectItem>
                                  <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please provide details about your inquiry..."
                                rows={6}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full bg-medical-blue hover:bg-blue-700 text-white px-8 py-4 text-lg"
                      >
                        <i className="fas fa-paper-plane mr-2"></i>
                        Send Message
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map Section */}
          <Card className="mt-12">
            <CardContent className="p-0">
              <div className="bg-slate-200 h-64 lg:h-80 rounded-lg flex items-center justify-center">
                <div className="text-center text-slate-600">
                  <i className="fas fa-map-marked-alt text-4xl mb-4"></i>
                  <p className="text-lg">Interactive Map</p>
                  <p className="text-sm">123 Health Street, Medical District</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}