import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Services() {
  const services = [
    {
      id: 1,
      name: "Family Medicine",
      description: "Comprehensive primary care for patients of all ages, including preventive care, chronic disease management, and routine check-ups.",
      icon: "fas fa-user-friends",
      color: "medical-blue",
      features: ["Annual Physical Exams", "Immunizations", "Chronic Disease Management", "Preventive Care"]
    },
    {
      id: 2,
      name: "Cardiology",
      description: "Specialized heart and cardiovascular care including diagnosis, treatment, and prevention of heart conditions.",
      icon: "fas fa-heartbeat",
      color: "healthcare-green",
      features: ["EKG Testing", "Stress Tests", "Heart Disease Treatment", "Hypertension Management"]
    },
    {
      id: 3,
      name: "Dermatology",
      description: "Expert skin care services for diagnosis and treatment of skin, hair, and nail conditions.",
      icon: "fas fa-hand-holding-medical",
      color: "professional-purple",
      features: ["Skin Cancer Screening", "Acne Treatment", "Cosmetic Procedures", "Rash Diagnosis"]
    },
    {
      id: 4,
      name: "Orthopedics",
      description: "Comprehensive bone, joint, and muscle care including injury treatment and rehabilitation.",
      icon: "fas fa-bone",
      color: "orange-500",
      features: ["Sports Injuries", "Joint Replacement", "Physical Therapy", "Fracture Care"]
    },
    {
      id: 5,
      name: "Pediatrics",
      description: "Specialized medical care for infants, children, and adolescents from birth to 18 years.",
      icon: "fas fa-baby",
      color: "pink-500",
      features: ["Well-Child Visits", "Vaccinations", "Growth Monitoring", "Developmental Assessments"]
    },
    {
      id: 6,
      name: "Emergency Care",
      description: "24/7 emergency medical services for urgent health conditions requiring immediate attention.",
      icon: "fas fa-ambulance",
      color: "red-500",
      features: ["24/7 Availability", "Trauma Care", "Urgent Treatment", "Emergency Surgery"]
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
              <Link href="/services" className="text-medical-blue font-medium">Services</Link>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Our Medical Services
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive healthcare services delivered by our expert medical team using the latest technology and best practices.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-${service.color} rounded-xl flex items-center justify-center mb-6`}>
                    <i className={`${service.icon} text-white text-2xl`}></i>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">{service.name}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <h4 className="font-medium text-slate-900">Key Services:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="text-sm text-slate-600 flex items-center">
                          <i className="fas fa-check text-healthcare-green mr-2 text-xs"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href="/booking">
                    <Button className="w-full bg-medical-blue hover:bg-blue-700 text-white">
                      Book Appointment
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Insurance & Payment Info */}
          <Card className="mb-12">
            <CardContent className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Insurance & Payment</h2>
                  <p className="text-slate-600 mb-6">
                    We accept most major insurance plans and offer flexible payment options to ensure 
                    you receive the care you need without financial barriers.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Accepted Insurance:</h4>
                      <ul className="space-y-1 text-slate-600">
                        <li>• Blue Cross Blue Shield</li>
                        <li>• Aetna</li>
                        <li>• United Healthcare</li>
                        <li>• Medicare & Medicaid</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Payment Options:</h4>
                      <ul className="space-y-1 text-slate-600">
                        <li>• Cash & Credit Cards</li>
                        <li>• Payment Plans</li>
                        <li>• HSA/FSA Accepted</li>
                        <li>• Online Bill Pay</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <i className="fas fa-shield-alt text-medical-blue text-6xl mb-4"></i>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">HIPAA Compliant</h3>
                  <p className="text-slate-600">Your privacy and security are our top priority</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-healthcare-green to-medical-blue text-white">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-xl mb-8 text-blue-100">
                  Schedule an appointment today and experience personalized healthcare with our AI-powered booking system.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/booking">
                    <Button className="bg-white text-medical-blue hover:bg-blue-50 px-8 py-3 text-lg">
                      <i className="fas fa-calendar-plus mr-2"></i>
                      Book Appointment
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-medical-blue px-8 py-3 text-lg">
                      <i className="fas fa-phone mr-2"></i>
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}