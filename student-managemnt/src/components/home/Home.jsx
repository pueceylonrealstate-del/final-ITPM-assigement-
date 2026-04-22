import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Award,
  Bell,
  Menu,
  X,
  ChevronRight,
  Star,
  Clock,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  LayoutDashboard
} from 'lucide-react';

// Import local images
import campusImage from '../assets/pexels-kampus-5940709.jpg';
import studentImage from '../assets/pexels-olly-3776190.jpg';
import libraryImage from '../assets/pexels-mikhail-nilov-7777128.jpg';
import eventImage from '../assets/pexels-olly-3776190.jpg';

const Home = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Statistics data with green theme
  const stats = [
    { icon: Users, value: "15,000+", label: "Active Students", color: "bg-green-600", bgLight: "bg-green-50" },
    { icon: GraduationCap, value: "250+", label: "Faculty Members", color: "bg-emerald-600", bgLight: "bg-emerald-50" },
    { icon: BookOpen, value: "50+", label: "Academic Programs", color: "bg-green-700", bgLight: "bg-green-50" },
    { icon: Award, value: "95%", label: "Graduation Rate", color: "bg-teal-600", bgLight: "bg-teal-50" }
  ];

  // Featured programs with images
  const programs = [
    { name: "Computer Science", duration: "4 Years", degree: "B.Sc.", students: 1200, color: "green", image: campusImage },
    { name: "Business Administration", duration: "4 Years", degree: "BBA", students: 950, color: "emerald", image: studentImage },
    { name: "Software Engineering", duration: "4 Years", degree: "B.Eng.", students: 1100, color: "green", image: campusImage },
    { name: "Data Science", duration: "4 Years", degree: "B.Sc.", students: 800, color: "teal", image: studentImage }
  ];

  // Latest news
  const news = [
    { 
      id: 1,
      title: "Registration for Spring Semester 2026 Now Open", 
      date: "March 20, 2026", 
      category: "Announcement",
      description: "All students can now register for the Spring 2026 semester. Deadline is April 15th.",
      icon: Bell,
      image: campusImage
    },
    { 
      id: 2,
      title: "University Ranked Top 10 in Research Excellence", 
      date: "March 18, 2026", 
      category: "Achievement",
      description: "Our university has been recognized for outstanding research contributions in AI and Technology.",
      icon: Award,
      image: libraryImage
    },
    { 
      id: 3,
      title: "Annual Tech Fest 2026 - Register Now!", 
      date: "March 15, 2026", 
      category: "Event",
      description: "Join us for the biggest tech event of the year with workshops, hackathons, and guest speakers.",
      icon: Calendar,
      image: eventImage
    }
  ];

  // Upcoming events
  const events = [
    { name: "Career Fair 2026", date: "April 10, 2026", time: "10:00 AM - 4:00 PM", location: "Main Auditorium", image: campusImage },
    { name: "Research Symposium", date: "April 15, 2026", time: "9:00 AM - 5:00 PM", location: "Science Complex", image: libraryImage },
    { name: "Alumni Meetup", date: "April 20, 2026", time: "6:00 PM - 9:00 PM", location: "University Club", image: eventImage }
  ];

  // Quick links
  const quickLinks = [
    { name: "Academic Calendar", icon: Calendar, link: "#" },
    { name: "Student Portal", icon: Users, link: "#" },
    { name: "Library Resources", icon: BookOpen, link: "#" },
    { name: "Financial Aid", icon: TrendingUp, link: "#" }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Computer Science Student",
      text: "The faculty and resources here are exceptional. The hands-on learning approach really prepared me for my career.",
      rating: 5,
      image: studentImage
    },
    {
      name: "Michael Chen",
      role: "Alumni, Class of 2023",
      text: "My experience at this university was transformative. The networking opportunities and industry connections are invaluable.",
      rating: 5,
      image: campusImage
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Professor of Mathematics",
      text: "Teaching here has been incredibly rewarding. The students are motivated and the learning environment is excellent.",
      rating: 5,
      image: libraryImage
    }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation handlers
  const handleApplyNow = () => {
    navigate('/register');
  };

  const handleProgramsClick = () => {
    navigate('/programs');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleStudentLifeClick = () => {
    navigate('/student-life');
  };

  const handleAdmissionsClick = () => {
    navigate('/admissions');
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Navigation Bar - Green and White Theme */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg border-b border-gray-100' : 'bg-green-700'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <GraduationCap className={`h-8 w-8 ${scrolled ? 'text-green-600' : 'text-white'}`} />
              <span className={`ml-2 text-xl font-bold ${scrolled ? 'text-green-700' : 'text-white'}`}>
                UniManage
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className={`${scrolled ? 'text-gray-700' : 'text-white'} hover:text-green-300 transition font-medium`}>Home</a>
              <a 
                onClick={handleProgramsClick}
                className={`${scrolled ? 'text-gray-700' : 'text-white'} hover:text-green-300 transition font-medium cursor-pointer`}
              >
                Programs
              </a>
              <a 
                onClick={handleAdmissionsClick}
                className={`${scrolled ? 'text-gray-700' : 'text-white'} hover:text-green-300 transition font-medium cursor-pointer`}
              >
                Admissions
              </a>
              <a 
                onClick={handleStudentLifeClick}
                className={`${scrolled ? 'text-gray-700' : 'text-white'} hover:text-green-300 transition font-medium cursor-pointer`}
              >
                Student Life
              </a>
              <a 
                onClick={handleContactClick}
                className={`${scrolled ? 'text-gray-700' : 'text-white'} hover:text-green-300 transition font-medium cursor-pointer`}
              >
                Contact
              </a>
              <a 
                onClick={handleDashboardClick}
                className={`${scrolled ? 'text-gray-700' : 'text-white'} hover:text-green-300 transition font-medium cursor-pointer flex items-center gap-1`}
              >
                <LayoutDashboard size={16} />
                Dashboard
              </a>
              <button 
                onClick={handleLoginClick}
                className="bg-white text-green-700 px-5 py-2 rounded-lg hover:bg-green-50 transition font-semibold shadow-md"
              >
                Login
              </button>
            </div>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden ${scrolled ? 'text-gray-700' : 'text-white'}`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition">Home</a>
              <a 
                onClick={handleProgramsClick}
                className="block px-3 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition cursor-pointer"
              >
                Programs
              </a>
              <a 
                onClick={handleAdmissionsClick}
                className="block px-3 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition cursor-pointer"
              >
                Admissions
              </a>
              <a 
                onClick={handleStudentLifeClick}
                className="block px-3 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition cursor-pointer"
              >
                Student Life
              </a>
              <a 
                onClick={handleContactClick}
                className="block px-3 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition cursor-pointer"
              >
                Contact
              </a>
              <a 
                onClick={handleDashboardClick}
                className="block px-3 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition cursor-pointer flex items-center gap-2"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </a>
              <button 
                onClick={handleLoginClick}
                className="w-full text-center px-3 py-2 bg-green-600 text-white rounded-lg font-semibold"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Local Image */}
      <div className="relative bg-gradient-to-br from-green-700 via-green-600 to-emerald-700 pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0">
          <img 
            src={campusImage}
            alt="University Campus"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Shape Your Future at
                <span className="block text-green-200">University of Excellence</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-green-50">
                Join a community of innovators, thinkers, and leaders. Experience world-class education with state-of-the-art facilities.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={handleApplyNow}
                  className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-700 hover:text-white transition border-2 border-white shadow-md flex items-center gap-2"
                >
                  Apply Now <ChevronRight size={18} />
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition">
                  Explore Programs
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src={studentImage}
                alt="Students studying"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Statistics Section - White Background */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className={`${stat.bgLight} rounded-2xl p-6 text-center hover:shadow-lg transition duration-300 border border-green-100`}>
                <div className={`${stat.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="text-white" size={28} />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Programs Section with Images */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured <span className="text-green-600">Academic Programs</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our diverse range of programs designed to prepare you for success in your chosen career path.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group border border-gray-100">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={program.image} 
                    alt={program.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>
                <div className={`h-1 bg-${program.color}-600`}></div>
                <div className="p-6">
                  <BookOpen className={`text-${program.color}-600 mb-4`} size={32} />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{program.name}</h3>
                  <p className="text-green-600 font-semibold mb-2">{program.degree}</p>
                  <p className="text-gray-600 text-sm mb-1">Duration: {program.duration}</p>
                  <p className="text-gray-600 text-sm mb-4">Students: {program.students}+</p>
                  <button className="text-green-600 font-semibold flex items-center gap-1 hover:gap-2 transition">
                    Learn More <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* News & Events Section with Images */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Latest News */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Bell className="text-green-600" /> Latest News
              </h2>
              <div className="space-y-4">
                {news.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-5 hover:shadow-md transition cursor-pointer border-l-4 border-green-600">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded mb-2 inline-block">
                          {item.category}
                        </span>
                        <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-6 text-green-600 font-semibold flex items-center gap-1 hover:gap-2 transition">
                View All News <ChevronRight size={18} />
              </button>
            </div>

            {/* Upcoming Events */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Calendar className="text-green-600" /> Upcoming Events
              </h2>
              <div className="space-y-4">
                {events.map((event, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-5 hover:shadow-md transition">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={event.image} 
                          alt={event.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="bg-green-600 text-white text-center rounded-lg px-3 py-1 min-w-[70px]">
                            <div className="text-lg font-bold">{event.date.split(',')[0].split(' ')[1]}</div>
                            <div className="text-xs">{event.date.split(',')[0].split(' ')[0]}</div>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800 mb-2">{event.name}</h3>
                            <p className="text-gray-600 text-sm flex items-center gap-2 mb-1">
                              <Clock size={14} /> {event.time}
                            </p>
                            <p className="text-gray-600 text-sm flex items-center gap-2">
                              <MapPin size={14} /> {event.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-6 text-green-600 font-semibold flex items-center gap-1 hover:gap-2 transition">
                View All Events <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Quick <span className="text-green-600">Resources</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <a key={index} href={link.link} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition group">
                <link.icon className="text-green-600 mx-auto mb-3 group-hover:scale-110 transition" size={36} />
                <h3 className="font-semibold text-gray-800">{link.name}</h3>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section with Images */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">What Our <span className="text-green-600">Community Says</span></h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Hear from our students, alumni, and faculty about their experience at our university.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex mb-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="text-yellow-400 fill-current" size={16} />
                      ))}
                    </div>
                    <p className="font-bold text-gray-800">{testimonial.name}</p>
                    <p className="text-xs text-green-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer - Green Theme */}
      <footer className="bg-green-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <GraduationCap className="h-8 w-8" />
                <span className="ml-2 text-xl font-bold">UniManage</span>
              </div>
              <p className="text-green-200 mb-4">
                Empowering students to achieve excellence through quality education and innovation.
              </p>
              <div className="flex space-x-3">
                <Facebook className="hover:text-green-300 cursor-pointer transition" size={20} />
                <Twitter className="hover:text-green-300 cursor-pointer transition" size={20} />
                <Linkedin className="hover:text-green-300 cursor-pointer transition" size={20} />
                <Instagram className="hover:text-green-300 cursor-pointer transition" size={20} />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-green-200">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Admissions</a></li>
                <li><a href="#" className="hover:text-white transition">Academics</a></li>
                <li><a href="#" className="hover:text-white transition">Research</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Info</h3>
              <ul className="space-y-2 text-green-200">
                <li className="flex items-center gap-2"><Mail size={16} /> info@unimanage.edu</li>
                <li className="flex items-center gap-2"><Phone size={16} /> +1 (555) 123-4567</li>
                <li className="flex items-center gap-2"><MapPin size={16} /> 123 University Ave, City</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Newsletter</h3>
              <p className="text-green-200 mb-3">Subscribe for updates and news</p>
              <div className="flex">
                <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 rounded-l-lg text-gray-800" />
                <button className="bg-green-600 px-4 py-2 rounded-r-lg hover:bg-green-700 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-200">
            <p>&copy; 2026 UniManage. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;