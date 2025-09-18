import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Doctor } from "@shared/schema";

export default function Doctors() {
  const { data: doctors = [], isLoading } = useQuery<Doctor[]>({
    queryKey: ['/api/doctors'],
  });

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
              <Link href="/doctors" className="text-medical-blue font-medium">Doctors</Link>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Our Medical Team
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Meet our experienced healthcare professionals dedicated to providing you with the highest quality care.
            </p>
          </div>

          {/* Doctors Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4"></div>
                    <div className="h-6 bg-slate-200 rounded mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded mb-4"></div>
                    <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor) => (
                <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    {/* Doctor Avatar */}
                    <div className="w-24 h-24 bg-gradient-to-br from-medical-blue to-professional-purple rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-user-md text-white text-2xl"></i>
                    </div>
                    
                    {/* Doctor Info */}
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{doctor.name}</h3>
                    <Badge variant="secondary" className="mb-4">
                      {doctor.specialty}
                    </Badge>
                    
                    {/* Contact Info */}
                    <div className="space-y-2 text-sm text-slate-600 mb-6">
                      <p className="flex items-center justify-center">
                        <i className="fas fa-envelope mr-2"></i>
                        {doctor.email}
                      </p>
                      <p className="flex items-center justify-center">
                        <i className="fas fa-circle text-healthcare-green mr-2" style={{fontSize: '8px'}}></i>
                        {doctor.available ? 'Available' : 'Unavailable'}
                      </p>
                    </div>

                    {/* Book Appointment Button */}
                    <Link href="/booking">
                      <Button className="w-full bg-medical-blue hover:bg-blue-700 text-white">
                        <i className="fas fa-calendar-plus mr-2"></i>
                        Book Appointment
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-medical-blue to-professional-purple text-white">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold mb-4">Ready to Schedule Your Appointment?</h2>
                <p className="text-xl mb-8 text-blue-100">
                  Our AI-powered system will match you with the right specialist for your needs.
                </p>
                <Link href="/booking">
                  <Button className="bg-white text-medical-blue hover:bg-blue-50 px-8 py-3 text-lg">
                    <i className="fas fa-robot mr-2"></i>
                    Book with AI Assistant
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}