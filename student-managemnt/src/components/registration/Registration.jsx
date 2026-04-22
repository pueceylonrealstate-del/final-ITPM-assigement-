import React, { useState } from 'react';

import axios from 'axios';
import { 
  GraduationCap, 
  User, 
  Home,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import PersonalInfoPage from './PersonalInfoPage';
import AddressPage from './AddressPage';
import AcademicPage from './AcademicPage';
import AccountPage from './AccountPage';

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // Form data state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    profileImage: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    program: '',
    intake: '',
    previousEducation: '',
    institution: '',
    graduationYear: '',
    username: '',
    password: '',
    confirmPassword: '',
    emergencyContact: '',
    emergencyPhone: '',
    howDidYouHear: ''
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        nationality: formData.nationality,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        program: formData.program,
        intake: formData.intake,
        previousEducation: formData.previousEducation,
        institution: formData.institution,
        graduationYear: formData.graduationYear,
        username: formData.username,
        password: formData.password,
        emergencyContact: formData.emergencyContact,
        emergencyPhone: formData.emergencyPhone,
        howDidYouHear: formData.howDidYouHear
      });
      
      if (response.data.success) {
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error('Registration error:', error);
      setSubmitError(error.response?.data?.message || 'Registration failed. Please try again.');
      return { success: false, error: error.response?.data?.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Address", icon: Home },
    { number: 3, title: "Academic", icon: GraduationCap },
    { number: 4, title: "Account", icon: GraduationCap }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="text-green-600" size={40} />
            <span className="ml-2 text-2xl font-bold text-gray-800">UniManage</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Student Registration</h1>
          <p className="text-gray-600">Join our community and start your journey towards excellence</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex-1 relative">
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center relative z-10
                      transition-all duration-300
                      ${isActive ? 'bg-green-600 text-white ring-4 ring-green-200' : 
                        isCompleted ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}
                    `}>
                      {isCompleted ? <CheckCircle size={20} /> : <StepIcon size={20} />}
                    </div>
                    <div className="mt-2 text-xs font-medium text-center">
                      <span className={`${isActive ? 'text-green-600' : 'text-gray-500'}`}>
                        {step.title}
                      </span>
                    </div>
                  </div>
                  {step.number < steps.length && (
                    <div className={`absolute top-5 left-1/2 w-full h-0.5 transition-all duration-300
                      ${currentStep > step.number ? 'bg-green-600' : 'bg-gray-300'}`}
                      style={{ transform: 'translateY(-50%)' }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {submitError && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm flex items-center gap-2">
            <AlertCircle size={16} />
            {submitError}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 md:p-8">
            {currentStep === 1 && <PersonalInfoPage formData={formData} updateFormData={updateFormData} onNext={nextStep} />}
            {currentStep === 2 && <AddressPage formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrevious={prevStep} />}
            {currentStep === 3 && <AcademicPage formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrevious={prevStep} />}
            {currentStep === 4 && <AccountPage formData={formData} updateFormData={updateFormData} onSubmit={handleSubmit} onPrevious={prevStep} isSubmitting={isSubmitting} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;