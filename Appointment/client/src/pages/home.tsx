import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
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
              <Link href="/" className="text-medical-blue font-medium">Home</Link>
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-medical-blue to-professional-purple text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Health, <br className="hidden lg:block" />
                <span className="text-blue-200">Simplified</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed">
                Experience the future of healthcare with our AI-powered appointment scheduling system. Book with your preferred doctor in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/booking" className="bg-white text-medical-blue px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center">
                  <i className="fas fa-calendar-plus mr-2"></i>
                  Book Appointment
                </Link>
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-medical-blue transition-all">
                  <i className="fas fa-phone mr-2"></i>
                  Call Now
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" alt="Healthcare professionals in modern medical facility" className="rounded-2xl shadow-2xl w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
              Why Choose Our Clinic?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Advanced AI technology meets compassionate care to provide you with the best healthcare experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-slate-50 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-medical-blue rounded-xl flex items-center justify-center mb-6">
                  <i className="fas fa-robot text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">AI-Powered Scheduling</h3>
                <p className="text-slate-600 leading-relaxed">
                  Our intelligent system automatically matches you with the right doctor based on your needs and preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-healthcare-green rounded-xl flex items-center justify-center mb-6">
                  <i className="fas fa-clock text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Instant Confirmation</h3>
                <p className="text-slate-600 leading-relaxed">
                  Get immediate appointment confirmation with automated reminders via email and SMS.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-professional-purple rounded-xl flex items-center justify-center mb-6">
                  <i className="fas fa-user-md text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Expert Doctors</h3>
                <p className="text-slate-600 leading-relaxed">
                  Access to board-certified specialists across multiple medical fields with proven track records.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mb-6">
                  <i className="fas fa-shield-alt text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Secure & Private</h3>
                <p className="text-slate-600 leading-relaxed">
                  HIPAA-compliant platform ensuring your medical information remains completely secure.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-pink-500 rounded-xl flex items-center justify-center mb-6">
                  <i className="fas fa-mobile-alt text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Mobile Friendly</h3>
                <p className="text-slate-600 leading-relaxed">
                  Book appointments seamlessly from any device with our responsive, user-friendly interface.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-indigo-500 rounded-xl flex items-center justify-center mb-6">
                  <i className="fas fa-chart-line text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Health Tracking</h3>
                <p className="text-slate-600 leading-relaxed">
                  Monitor your health journey with integrated tracking and follow-up care coordination.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-healthcare-green to-medical-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Ready to Experience Better Healthcare?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of patients who trust us with their health. Book your appointment today.
          </p>
          <Link href="/booking" className="bg-white text-medical-blue px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center">
            <i className="fas fa-calendar-plus mr-2"></i>
            Schedule Your Visit
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <i className="fas fa-heartbeat text-medical-blue text-2xl"></i>
                <span className="text-xl font-bold">MediCare Clinic</span>
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Advanced healthcare with AI-powered scheduling. Your health, simplified through technology and compassionate care.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-medical-blue transition-colors">
                  <i className="fab fa-facebook text-sm"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-medical-blue transition-colors">
                  <i className="fab fa-twitter text-sm"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-medical-blue transition-colors">
                  <i className="fab fa-linkedin text-sm"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Doctors</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Insurance</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-center">
                  <i className="fas fa-phone mr-2"></i>
                  (555) 123-4567
                </li>
                <li className="flex items-center">
                  <i className="fas fa-envelope mr-2"></i>
                  info@medicare.com
                </li>
                <li className="flex items-center">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  123 Health St, Medical City
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2024 MediCare Clinic. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
