import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  User, 
  Lock, 
  AlertCircle,
  Eye,
  EyeOff,
  LogIn,
  Shield,
  Mail,
  Phone
} from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itNumber: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Mock student data for demo
  const mockStudentData = {
    itNumber: 'IT2024001',
    password: 'student123',
    studentData: {
      id: 'IT2024001',
      name: 'John Doe',
      email: 'john.doe@unimanage.edu',
      phone: '+1 234 567 8900',
      program: 'Computer Science (B.Sc.)',
      year: '3rd Year',
      semester: 'Semester 5',
      gpa: '3.75',
      profileImage: null,
      enrolledCourses: [
        { code: 'CS301', name: 'Database Management Systems', credits: 3, grade: 'A', instructor: 'Dr. Emily Rodriguez', schedule: 'Mon/Wed 2:00 PM' },
        { code: 'CS401', name: 'Artificial Intelligence', credits: 4, grade: 'A-', instructor: 'Dr. Alan Turing', schedule: 'Wed/Fri 1:00 PM' },
        { code: 'CS250', name: 'Web Development', credits: 3, grade: 'B+', instructor: 'Prof. David Wilson', schedule: 'Tue/Thu 10:00 AM' },
        { code: 'CS201', name: 'Data Structures & Algorithms', credits: 4, grade: 'A', instructor: 'Prof. Michael Chen', schedule: 'Tue/Thu 1:00 PM' }
      ],
      modules: [
        { name: 'Database Systems', code: 'CS301', attendance: '92%', assignments: 'Submitted', midterm: '85%', final: 'Pending' },
        { name: 'Artificial Intelligence', code: 'CS401', attendance: '88%', assignments: 'Submitted', midterm: '82%', final: 'Pending' },
        { name: 'Web Development', code: 'CS250', attendance: '95%', assignments: 'Submitted', midterm: '90%', final: 'Pending' },
        { name: 'Data Structures', code: 'CS201', attendance: '91%', assignments: 'Submitted', midterm: '88%', final: 'Pending' }
      ],
      facultyNotices: [
        { id: 1, title: 'Midterm Exam Schedule', date: 'March 25, 2026', description: 'Midterm exams will be held from April 1-10, 2026', priority: 'high', from: 'Dean\'s Office' },
        { id: 2, title: 'Project Submission Deadline', date: 'March 28, 2026', description: 'Final project submissions due by April 15, 2026', priority: 'medium', from: 'Dr. Emily Rodriguez' },
        { id: 3, title: 'Guest Lecture: AI in Healthcare', date: 'March 30, 2026', description: 'Special guest lecture by Dr. Sarah Johnson from Google AI', priority: 'high', from: 'Computer Science Department' }
      ],
      moduleNotices: [
        { id: 1, title: 'Database Systems - Assignment 3', date: 'March 24, 2026', description: 'Assignment 3 released. Due date: April 5, 2026', module: 'CS301', from: 'Dr. Emily Rodriguez' },
        { id: 2, title: 'AI - Quiz 2 Results', date: 'March 23, 2026', description: 'Quiz 2 results published. Check your grades', module: 'CS401', from: 'Dr. Alan Turing' },
        { id: 3, title: 'Web Dev - Lab Session', date: 'March 22, 2026', description: 'Special lab session on React Hooks this Friday', module: 'CS250', from: 'Prof. David Wilson' },
        { id: 4, title: 'Data Structures - Code Challenge', date: 'March 21, 2026', description: 'Weekly coding challenge posted on portal', module: 'CS201', from: 'Prof. Michael Chen' }
      ],
      upcomingEvents: [
        { name: 'Career Fair 2026', date: 'April 10, 2026', time: '10:00 AM - 4:00 PM', location: 'Main Auditorium' },
        { name: 'Tech Symposium', date: 'April 15, 2026', time: '9:00 AM - 5:00 PM', location: 'Science Complex' },
        { name: 'Alumni Networking', date: 'April 20, 2026', time: '6:00 PM - 9:00 PM', location: 'University Club' }
      ],
      achievements: [
        { title: 'Dean\'s List', year: '2025', description: 'Achieved Dean\'s List for academic excellence' },
        { title: 'Hackathon Winner', year: '2025', description: '1st place in University Hackathon' }
      ]
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.itNumber) {
      tempErrors.itNumber = 'IT Number is required';
    } else if (!/^IT\d{7}$/.test(formData.itNumber) && !/^\d{8,}$/.test(formData.itNumber)) {
      tempErrors.itNumber = 'Invalid IT Number format (e.g., IT2024001)';
    }
    
    if (!formData.password) {
      tempErrors.password = 'Password is required';
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        
        // Check credentials (demo)
        if (formData.itNumber === mockStudentData.itNumber && 
            formData.password === mockStudentData.password) {
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
            navigate('/student-profile', { state: { student: mockStudentData.studentData } });
          }, 1500);
        } else {
          setErrors({ login: 'Invalid IT Number or Password' });
          setTimeout(() => setErrors({}), 3000);
        }
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      {/* Success Popup */}
      {showPopup && (
        <div className="fixed top-20 right-4 z-50 animate-slideInRight">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <LogIn size={20} />
            <span>Login Successful! Redirecting...</span>
          </div>
        </div>
      )}

      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="text-green-600" size={48} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
          <p className="text-gray-600 mt-2">Login to access your student portal</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            {errors.login && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                {errors.login}
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IT Number *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="itNumber"
                  value={formData.itNumber}
                  onChange={handleChange}
                  placeholder="IT2024001"
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition
                    ${errors.itNumber ? 'border-red-500' : 'border-gray-300'}`}
                />
              </div>
              {errors.itNumber && (
                <p className="mt-1 text-sm text-red-500">{errors.itNumber}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition
                    ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="mb-6 flex justify-between items-center">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-green-600 hover:text-green-700">Forgot Password?</a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Login
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Demo Credentials: <br />
              IT Number: <span className="font-mono font-semibold">IT2024001</span><br />
              Password: <span className="font-mono font-semibold">student123</span>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              New student?{' '}
              <button 
                onClick={() => navigate('/register')}
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Register here
              </button>
            </p>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <Shield size={14} />
            <span>Your data is secure and encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;