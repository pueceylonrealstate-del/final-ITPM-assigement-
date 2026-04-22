import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  LayoutDashboard, Users, BookOpen, Calendar, Settings, LogOut, User, Mail, Phone,
  GraduationCap, Award, AlertCircle, X, Bell, ChevronLeft, ChevronRight, CheckCircle,
  Clock, Download, Printer, Search, Save, RefreshCw, Shield, Lock, Key, UserCheck,
  BarChart3, TrendingUp, Plus, Edit, Trash2, MessageCircle, Headphones, HelpCircle,
  FileText, CreditCard, Home, Building, Globe, Heart, Star, Trophy, Zap, Target, Rocket,
  Eye, ThumbsUp, ThumbsDown, FileCheck, ClipboardList, Reply, Send, Filter, Upload,
  Monitor, Sun, Moon, Languages, Database
} from 'lucide-react';

// Password Modal Component
const PasswordModal = ({ title, onClose, onSuccess, expectedPassword }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (password === expectedPassword) {
        setError('');
        onSuccess();
        onClose();
      } else {
        setError('Invalid password. Please try again.');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Lock className="text-green-600" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Authentication Required</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded"><X size={20} /></button>
        </div>
        <p className="text-gray-600 mb-4">Please enter your password to access <strong>{title}</strong></p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" placeholder="Enter password" autoFocus />
            {error && <p className="mt-2 text-sm text-red-500 flex items-center gap-1"><AlertCircle size={14} /> {error}</p>}
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50">{isLoading ? 'Verifying...' : 'Verify & Access'}</button>
        </form>
      </div>
    </div>
  );
};

// Management Card Component
const ManagementCard = ({ icon: Icon, title, description, color, stats, onClick }) => {
  return (
    <div onClick={onClick} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
      <div className={`${color} p-6`}><Icon className="text-white" size={40} /></div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        {stats && (<div className="flex items-center justify-between pt-4 border-t border-gray-100"><span className="text-2xl font-bold text-green-600">{stats.value}</span><span className="text-xs text-gray-500">{stats.label}</span></div>)}
        <div className="mt-4 flex items-center text-green-600 text-sm font-semibold group-hover:gap-2 transition-all">Manage <ChevronRight size={16} className="ml-1" /></div>
      </div>
    </div>
  );
};

// Placeholder Components
const EnrollmentManagement = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/admissions/applications');
      if (response.data.success) {
        setApplications(response.data.applications);
      }
    } catch (error) {
      console.error('Failed to fetch applications', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/admissions/applications/${id}/status`, {
        status: 'accepted'
      });
      if (response.data.success) {
        alert("Application Approved! Opening automatically generated student profile...");
        fetchApplications();
        setSelectedApp(null);
        
        // Dynamically wrap the backend payload into StudentProfile.jsx architecture
        const createdUser = response.data.user;
        const mappedStudentData = {
          id: createdUser._id,
          name: createdUser.fullName,
          email: createdUser.email,
          phone: createdUser.phone || 'Pending',
          program: createdUser.program,
          year: '1st Year',
          semester: 'Semester 1',
          gpa: '0.00',
          profileImage: createdUser.profileImage,
          enrolledCourses: [
            { code: 'COR101', name: 'University Introduction', credits: 1, grade: 'Pending', instructor: 'Advising Staff', schedule: 'TBD' },
            { code: `${createdUser.program.substring(0,3).toUpperCase()}101`, name: `Introduction to ${createdUser.program}`, credits: 3, grade: 'Pending', instructor: 'TBD', schedule: 'TBD' }
          ],
          modules: [
            { name: `Intro to ${createdUser.program}`, code: '101', attendance: '0%', assignments: '0/0', midterm: 'N/A', final: 'N/A', grade: 'Pending' }
          ],
          facultyNotices: [
            { id: 1, title: 'Welcome to UniManage!', date: new Date().toLocaleDateString(), description: 'Your student profile has been provisioned successfully.', priority: 'high', from: 'Admissions Office' }
          ],
          moduleNotices: [],
          upcomingEvents: [],
          achievements: []
        };

        navigate('/student-profile', { state: { student: mappedStudentData } });
      }
    } catch (error) {
      console.error('Failed to accept', error);
      alert('Error updating application status');
    }
  };

  const handleDecline = async (id) => {
    if (window.confirm("Are you sure you want to decline this application?")) {
      try {
        const response = await axios.put(`http://localhost:5000/api/admissions/applications/${id}/status`, {
          status: 'rejected'
        });
        if (response.data.success) {
          alert("Application Declined. Email notification dispatched.");
          fetchApplications();
          setSelectedApp(null);
        }
      } catch (error) {
        console.error('Failed to decline', error);
        alert('Error declining application');
      }
    }
  };

  if (loading) return <div className="p-6 flex justify-center"><RefreshCw className="animate-spin text-blue-600" size={32} /></div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Enrollment Management</h2>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">{applications.length} Applications</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 font-semibold text-gray-700">Applicant Name</th>
              <th className="p-4 font-semibold text-gray-700">Program Applied</th>
              <th className="p-4 font-semibold text-gray-700">Status</th>
              <th className="p-4 font-semibold text-gray-700">Date</th>
              <th className="p-4 font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4">{app.fullName}</td>
                <td className="p-4">{app.program}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {app.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-4">{new Date(app.applicationDate).toLocaleDateString()}</td>
                <td className="p-4">
                  <button 
                    onClick={() => setSelectedApp(app)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-semibold"
                  >
                    <Eye size={16} /> Review
                  </button>
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr><td colSpan="5" className="p-4 text-center text-gray-500">No applications found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6 my-8 mt-10 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b pb-4 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FileText className="text-blue-600" />
                Application Review: {selectedApp.fullName}
              </h2>
              <button onClick={() => setSelectedApp(null)} className="p-1 hover:bg-gray-100 rounded text-gray-500">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6 border-b pb-6">
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Applicant Details</h3>
                  <p className="text-sm"><strong className="text-gray-600">Name:</strong> {selectedApp.fullName}</p>
                  <p className="text-sm"><strong className="text-gray-600">Email:</strong> {selectedApp.email}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Program Selection</h3>
                  <p className="text-sm"><strong className="text-gray-600">Program:</strong> {selectedApp.program}</p>
                  <p className="text-sm"><strong className="text-gray-600">Status:</strong> <span className="uppercase">{selectedApp.status}</span></p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-3 bg-gray-100 px-3 py-2 rounded">Uploaded Documents</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {selectedApp.olResultSheetUrl ? (
                    <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-700 text-sm">O/L Results Sheet</p>
                        <p className="text-xs text-gray-500">Uploaded File</p>
                      </div>
                      <a href={`http://localhost:5000${selectedApp.olResultSheetUrl}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 p-2 bg-blue-50 rounded-full">
                        <Eye size={20} />
                      </a>
                    </div>
                  ) : (
                    <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                      <p className="text-sm text-gray-500">O/L Results not provided</p>
                    </div>
                  )}

                  {selectedApp.alResultSheetUrl ? (
                    <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-700 text-sm">A/L Results Sheet</p>
                        <p className="text-xs text-gray-500">Uploaded File</p>
                      </div>
                      <a href={`http://localhost:5000${selectedApp.alResultSheetUrl}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 p-2 bg-blue-50 rounded-full">
                        <Eye size={20} />
                      </a>
                    </div>
                  ) : (
                    <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                      <p className="text-sm text-gray-500">A/L Results not provided</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-4 border-t flex justify-end gap-3 sticky bottom-0 bg-white">
              <button 
                onClick={() => setSelectedApp(null)} 
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Close
              </button>
              {selectedApp.status !== 'accepted' && selectedApp.status !== 'rejected' && (
                <>
                  <button 
                    onClick={() => handleDecline(selectedApp._id)} 
                    className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-red-700 transition shadow-lg"
                  >
                    <X size={18} /> Decline
                  </button>
                  <button 
                    onClick={() => handleAccept(selectedApp._id)} 
                    className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-green-700 transition shadow-lg"
                  >
                    <CheckCircle size={18} /> Accept
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const CourseModal = ({ course, onClose, onSave }) => {
  const isEditing = !!course;
  const [formData, setFormData] = useState(course || {
    name: '', code: '', category: 'technology', degree: '', duration: '',
    credits: 120, fee: 8000, seats: 60, ranking: '', description: '',
    jobPlacement: '95%', averageSalary: '$85,000'
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await onSave(formData);
    setIsSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-3xl w-full p-6 my-8 mt-10 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6 border-b pb-4 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <BookOpen className="text-green-600" />
            {isEditing ? 'Edit Course' : 'Add New Course'}
          </h2>
          <button onClick={onClose} type="button" className="p-1 hover:bg-gray-100 rounded text-gray-500">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Course Name *</label><input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium mb-1">Course Code *</label><input type="text" name="code" required value={formData.code} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" /></div>
            
            <div><label className="block text-sm font-medium mb-1">Category *</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">
                <option value="technology">Technology</option>
                <option value="business">Business</option>
                <option value="engineering">Engineering</option>
                <option value="science">Science</option>
                <option value="arts">Arts & Humanities</option>
                <option value="healthcare">Healthcare</option>
              </select>
            </div>
            <div><label className="block text-sm font-medium mb-1">Degree Title *</label><input type="text" name="degree" required value={formData.degree} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="e.g. B.Sc. Computer Science" /></div>
            
            <div><label className="block text-sm font-medium mb-1">Duration *</label><input type="text" name="duration" required value={formData.duration} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="e.g. 4 Years" /></div>
            <div><label className="block text-sm font-medium mb-1">Ranking</label><input type="text" name="ranking" value={formData.ranking} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" placeholder="e.g. Top 10" /></div>
            
            <div><label className="block text-sm font-medium mb-1">Fee ($/year)</label><input type="number" name="fee" value={formData.fee} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium mb-1">Seats</label><input type="number" name="seats" value={formData.seats} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" /></div>
            
            <div><label className="block text-sm font-medium mb-1">Job Placement Rate</label><input type="text" name="jobPlacement" value={formData.jobPlacement} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium mb-1">Average Salary</label><input type="text" name="averageSalary" value={formData.averageSalary} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" /></div>
          </div>
          
          <div><label className="block text-sm font-medium mb-1">Description *</label><textarea name="description" required value={formData.description} onChange={handleChange} rows="3" className="w-full px-3 py-2 border rounded-lg" /></div>
          
          <div className="pt-4 border-t flex justify-end gap-3 sticky bottom-0 bg-white">
            <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg shrink-0">Cancel</button>
            <button type="submit" disabled={isSaving} className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold shrink-0">
              {isSaving ? 'Saving...' : 'Save Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/courses');
      if (res.data.success) setCourses(res.data.courses);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleSave = async (courseData) => {
    try {
      if (editingCourse) {
        await axios.put(`http://localhost:5000/api/courses/${editingCourse._id}`, courseData);
      } else {
        await axios.post('http://localhost:5000/api/courses', courseData);
      }
      setShowModal(false);
      setEditingCourse(null);
      fetchCourses();
    } catch (error) {
      console.error(error);
      alert('Failed to save course');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course completely?')) {
      try {
        await axios.delete(`http://localhost:5000/api/courses/${id}`);
        fetchCourses();
      } catch (error) {
        alert('Failed to delete course');
      }
    }
  };

  if (loading) return <div className="p-6 flex justify-center"><RefreshCw className="animate-spin text-green-600" size={32} /></div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Course Management</h2>
        <button onClick={() => { setEditingCourse(null); setShowModal(true); }} className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-green-700 transition">
          <Plus size={18} /> Add Course
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 font-semibold text-gray-700">Course Code</th>
              <th className="p-4 font-semibold text-gray-700">Name</th>
              <th className="p-4 font-semibold text-gray-700">Category</th>
              <th className="p-4 font-semibold text-gray-700">Fee</th>
              <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4 font-semibold text-gray-600">{course.code}</td>
                <td className="p-4">{course.name}</td>
                <td className="p-4 capitalize">{course.category}</td>
                <td className="p-4">${course.fee}/yr</td>
                <td className="p-4 flex gap-3 justify-end">
                  <button onClick={() => { setEditingCourse(course); setShowModal(true); }} className="text-blue-600 hover:text-blue-800"><Edit size={18}/></button>
                  <button onClick={() => handleDelete(course._id)} className="text-red-600 hover:text-red-800"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
            {courses.length === 0 && <tr><td colSpan="5" className="p-4 text-center text-gray-500">No courses defined yet.</td></tr>}
          </tbody>
        </table>
      </div>

      {showModal && <CourseModal course={editingCourse} onClose={() => setShowModal(false)} onSave={handleSave} />}
    </div>
  );
};
const RequirementsManagement = () => {
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingReq, setEditingReq] = useState(null);
  
  const defaultFormData = { category: 'undergraduate', title: '', description: '', items: [] };
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => { fetchRequirements(); }, []);

  const fetchRequirements = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/requirements');
      if (res.data.success) setRequirements(res.data.requirements);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingReq) {
        await axios.put(`http://localhost:5000/api/requirements/${editingReq._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/requirements', formData);
      }
      setShowModal(false);
      fetchRequirements();
    } catch (err) { alert('Failed to save'); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete requirement?')) {
      try {
        await axios.delete(`http://localhost:5000/api/requirements/${id}`);
        fetchRequirements();
      } catch (e) { alert('Delete failed'); }
    }
  };

  const openEdit = (req) => { setEditingReq(req); setFormData(req); setShowModal(true); };
  const openNew = () => { setEditingReq(null); setFormData(defaultFormData); setShowModal(true); };

  const addItem = () => {
    setFormData(prev => ({ ...prev, items: [...prev.items, { text: '', required: false, icon: 'CheckCircle' }] }));
  };
  const updateItem = (idx, field, val) => {
    const newItems = [...formData.items];
    newItems[idx][field] = val;
    setFormData(prev => ({ ...prev, items: newItems }));
  };
  const removeItem = (idx) => {
    const newItems = formData.items.filter((_, i) => i !== idx);
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  if (loading) return <div className="p-6 flex justify-center"><RefreshCw className="animate-spin text-green-600" size={32} /></div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Requirements Management</h2>
        <button onClick={openNew} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-indigo-700 transition">
          <Plus size={18} /> Add Requirement
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 font-semibold text-gray-700">Category</th>
              <th className="p-4 font-semibold text-gray-700">Title</th>
              <th className="p-4 font-semibold text-gray-700">Items</th>
              <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requirements.map(req => (
              <tr key={req._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4 uppercase text-xs font-bold text-gray-500">{req.category}</td>
                <td className="p-4 font-semibold">{req.title}</td>
                <td className="p-4">{req.items?.length || 0}</td>
                <td className="p-4 flex gap-3 justify-end">
                  <button onClick={() => openEdit(req)} className="text-blue-600 hover:text-blue-800"><Edit size={18}/></button>
                  <button onClick={() => handleDelete(req._id)} className="text-red-600 hover:text-red-800"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between mb-6 border-b pb-4"><h2 className="text-xl font-bold">{editingReq ? 'Edit' : 'Add'} Requirement</h2><button onClick={() => setShowModal(false)}><X size={24} /></button></div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Category</label><select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border p-2 rounded"><option value="undergraduate">Undergraduate</option><option value="graduate">Graduate</option><option value="international">International</option><option value="documents">Documents</option><option value="general">General</option></select></div>
                <div><label className="block text-sm font-medium mb-1">Title</label><input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border p-2 rounded" /></div>
              </div>
              <div><label className="block text-sm font-medium mb-1">Description</label><textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border p-2 rounded" /></div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2"><label className="block text-sm font-medium">Sub-Items</label><button type="button" onClick={addItem} className="text-sm bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">+ Add Item</button></div>
                {formData.items.map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-2 items-center">
                    <input className="flex-1 border p-2 rounded text-sm" placeholder="Text..." value={item.text} onChange={e => updateItem(idx, 'text', e.target.value)} required />
                    <label className="flex items-center text-sm gap-1"><input type="checkbox" checked={item.required} onChange={e => updateItem(idx, 'required', e.target.checked)} /> Req</label>
                    <button type="button" onClick={() => removeItem(idx)} className="text-red-500"><X size={16} /></button>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t"><button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">Cancel</button><button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded font-bold">Save</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
const ContactSupportManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/support/tickets');
      if (res.data.success) {
        setTickets(res.data.tickets);
      }
    } catch (err) { console.error('Failed to load tickets', err); }
    setLoading(false);
  };

  const handleReply = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/support/tickets/${selectedTicket._id}/reply`, {
        message: replyMessage
      });
      alert('Reply dispatched successfully! Notification email pushed to testing pipeline.');
      setSelectedTicket(null);
      setReplyMessage('');
      fetchTickets();
    } catch (err) { alert('Failed to send reply'); }
  };

  const resolveTicket = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/support/tickets/${id}/status`, { status: 'resolved' });
      fetchTickets();
    } catch(err) { alert('Failed to resolve'); }
  };

  if (loading) return <div className="p-6 flex justify-center"><RefreshCw className="animate-spin text-green-600" size={32} /></div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Contact & Support Management</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-700">User / Email</th>
              <th className="p-4 font-semibold text-gray-700">Category</th>
              <th className="p-4 font-semibold text-gray-700">Subject</th>
              <th className="p-4 font-semibold text-gray-700">Status</th>
              <th className="p-4 font-semibold text-gray-700">Rating</th>
              <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4 font-medium">{ticket.name} <br/><span className="text-xs text-gray-500 font-normal">{ticket.email}</span></td>
                <td className="p-4 capitalize text-sm">{ticket.category}</td>
                <td className="p-4 text-sm truncate max-w-[200px]">{ticket.subject}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs uppercase font-bold
                    ${ticket.status==='open' ? 'bg-red-100 text-red-700' :
                      ticket.status==='in_progress' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-green-100 text-green-700'}`}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="p-4">
                  {ticket.rating ? <div className="flex text-yellow-500"><Star fill="currentColor" size={14}/> {ticket.rating}/5</div> : <span className="text-gray-400 text-xs">Unrated</span>}
                </td>
                <td className="p-4 flex gap-2 justify-end">
                  <button onClick={() => setSelectedTicket(ticket)} className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-semibold hover:bg-blue-200">View/Reply</button>
                  {ticket.status !== 'resolved' && (
                    <button onClick={() => resolveTicket(ticket._id)} className="px-3 py-1 bg-green-100 text-green-700 rounded font-semibold text-sm flex items-center gap-1 hover:bg-green-200"><CheckCircle size={14}/> Resolve</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-xl font-bold">Manage Ticket <span className="text-gray-500 text-sm">#{selectedTicket.ticketNumber}</span></h2>
              <button onClick={() => setSelectedTicket(null)}><X size={24} className="text-gray-500 hover:text-red-500"/></button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm font-semibold text-gray-600">From:</p><p className="font-medium text-gray-800">{selectedTicket.name} <span className="font-normal text-sm">({selectedTicket.email})</span></p></div>
                <div><p className="text-sm font-semibold text-gray-600">Category / Priority:</p><p className="capitalize font-medium text-gray-800">{selectedTicket.category} / {selectedTicket.priority}</p></div>
              </div>
              <div><p className="text-sm font-semibold text-gray-600 mb-1">Subject:</p><p className="font-bold text-gray-800">{selectedTicket.subject}</p></div>
              <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg text-gray-700"><p className="whitespace-pre-wrap">{selectedTicket.message}</p></div>
              
              {selectedTicket.rating && (
                <div className="bg-yellow-50 p-4 border border-yellow-200 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-yellow-800 mb-1">User Feedback Rating Provided:</p>
                    <p className="flex items-center text-yellow-600 font-bold"><Star fill="currentColor" size={16} className="mr-1"/> {selectedTicket.rating} / 5</p>
                  </div>
                  {selectedTicket.feedback && (
                    <div className="text-sm text-yellow-700 italic border-l-2 border-yellow-400 pl-3">
                      "{selectedTicket.feedback}"
                    </div>
                  )}
                </div>
              )}
            </div>

            <form onSubmit={handleReply} className="border-t border-gray-200 pt-6 mt-6 relative">
              <label className="block text-sm font-bold text-gray-700 mb-2">Send Admin Reply (Dispatches Automated Email Notification)</label>
              <textarea 
                className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-blue-500 text-sm" 
                rows="4" 
                required 
                placeholder="Type your problem resolution response here..." 
                value={replyMessage}
                onChange={e => setReplyMessage(e.target.value)}
              />
              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setSelectedTicket(null)} className="px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold flex items-center gap-2"><Send size={16}/> Dispatch Email Reply</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '', category: 'music', description: '', date: '', time: '', location: ''
  });

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events');
      if (res.data.success) {
        setEvents(res.data.events);
      }
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if(window.confirm('Delete event?')){
      try {
        await axios.delete(`http://localhost:5000/api/events/${id}`);
        fetchEvents();
      } catch (err) { alert('Failed to delete'); }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/events', formData);
      setShowModal(false);
      setFormData({name: '', category: 'music', description: '', date: '', time: '', location: ''});
      fetchEvents();
    } catch (err) { alert('Failed to save event'); }
  };

  if (loading) return <div className="p-6 flex justify-center"><RefreshCw className="animate-spin text-green-600" size={32} /></div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Event Management</h2>
        <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-indigo-700 transition">
          <Plus size={18} /> Create Event
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-700">Event Name</th>
              <th className="p-4 font-semibold text-gray-700">Category</th>
              <th className="p-4 font-semibold text-gray-700">Date/Time</th>
              <th className="p-4 font-semibold text-gray-700">Location</th>
              <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(ev => (
              <tr key={ev._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-gray-800">{ev.name}</td>
                <td className="p-4 capitalize text-sm font-semibold">{ev.category}</td>
                <td className="p-4 text-sm">{new Date(ev.date).toLocaleDateString()} at {ev.time}</td>
                <td className="p-4 text-sm max-w-[150px] truncate">{ev.location}</td>
                <td className="p-4 flex gap-2 justify-end">
                  <button onClick={() => handleDelete(ev._id)} className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm font-semibold hover:bg-red-200"><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
            {events.length === 0 && <tr><td colSpan="5" className="p-4 text-center text-gray-500 italic">No scheduled events active.</td></tr>}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-xl font-bold">Launch New Event</h2>
              <button onClick={() => setShowModal(false)}><X size={24} className="text-gray-500 hover:text-red-500"/></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-bold mb-1 text-gray-700">Event Name</label><input required value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500 text-sm" /></div>
                <div><label className="block text-sm font-bold mb-1 text-gray-700">Category</label><select value={formData.category} onChange={e=>setFormData({...formData, category: e.target.value})} className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500 text-sm"><option value="music">Music</option><option value="dance">Dance</option><option value="outdoor">Outdoor</option><option value="sports">Sports</option><option value="academic">Academic</option></select></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-bold mb-1 text-gray-700">Set Date</label><input required type="date" value={formData.date} onChange={e=>setFormData({...formData, date: e.target.value})} className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500 text-sm" /></div>
                <div><label className="block text-sm font-bold mb-1 text-gray-700">Time Window</label><input required type="time" value={formData.time} onChange={e=>setFormData({...formData, time: e.target.value})} className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500 text-sm" /></div>
              </div>
              <div><label className="block text-sm font-bold mb-1 text-gray-700">Event Location Details</label><input required value={formData.location} onChange={e=>setFormData({...formData, location: e.target.value})} placeholder="Main Auditorium" className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500 text-sm" /></div>
              <div><label className="block text-sm font-bold mb-1 text-gray-700">Description Overview</label><textarea required value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} rows="3" className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500 text-sm" /></div>
              <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold flex items-center gap-2 hover:bg-indigo-700"><CheckCircle size={16}/> Save Event Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
const UserManagement = ({ users, loading }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  if (loading) return <div className="p-6 flex justify-center"><RefreshCw className="animate-spin text-green-600" size={32} /></div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">{users?.length || 0} Users</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 font-semibold text-gray-700">Name</th>
              <th className="p-4 font-semibold text-gray-700">Email</th>
              <th className="p-4 font-semibold text-gray-700">Phone</th>
              <th className="p-4 font-semibold text-gray-700">Nationality</th>
              <th className="p-4 font-semibold text-gray-700">Role</th>
              <th className="p-4 font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map(user => (
              <tr key={user._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4">{user.fullName}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.phone || '-'}</td>
                <td className="p-4">{user.nationality || '-'}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => setSelectedUser(user)}
                    className="text-green-600 hover:text-green-800 flex items-center gap-1 text-sm font-semibold"
                  >
                    <Eye size={16} /> View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 my-8 mt-10 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b pb-4 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <UserCheck className="text-green-600" />
                Applicant Details: {selectedUser.fullName}
              </h2>
              <button onClick={() => setSelectedUser(null)} className="p-1 hover:bg-gray-100 rounded text-gray-500">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-green-700 mb-3 border-b flex justify-between">Personal Info</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p><span className="text-gray-500">Email:</span> {selectedUser.email}</p>
                  <p><span className="text-gray-500">Phone:</span> {selectedUser.phone}</p>
                  <p><span className="text-gray-500">DOB:</span> {selectedUser.dateOfBirth}</p>
                  <p><span className="text-gray-500">Gender:</span> {selectedUser.gender}</p>
                  <p><span className="text-gray-500">Nationality:</span> {selectedUser.nationality}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-green-700 mb-3 border-b flex justify-between">Address</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p className="col-span-2"><span className="text-gray-500">Address:</span> {selectedUser.address}</p>
                  <p><span className="text-gray-500">City:</span> {selectedUser.city}</p>
                  <p><span className="text-gray-500">State:</span> {selectedUser.state}</p>
                  <p><span className="text-gray-500">Zip:</span> {selectedUser.zipCode}</p>
                  <p><span className="text-gray-500">Country:</span> {selectedUser.country}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-green-700 mb-3 border-b flex justify-between">Academic Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p className="col-span-2"><span className="text-gray-500">Program:</span> {selectedUser.program}</p>
                  <p><span className="text-gray-500">Intake:</span> {selectedUser.intake}</p>
                  <p><span className="text-gray-500">Previous Education:</span> {selectedUser.previousEducation}</p>
                  <p><span className="text-gray-500">Institution:</span> {selectedUser.institution}</p>
                  <p><span className="text-gray-500">Graduation Year:</span> {selectedUser.graduationYear}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button onClick={() => setSelectedUser(null)} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const StudentManagement = () => <div className="p-6"><h2 className="text-2xl font-bold">Student Management</h2><p className="text-gray-500 mt-2">Coming soon...</p></div>;

// Settings Management Component
const SettingsManagement = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [refreshing, setRefreshing] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'UniManage', siteEmail: 'info@unimanage.edu', sitePhone: '+1 (555) 123-4567',
    darkMode: false, emailNotifications: true, smsNotifications: false, autoBackup: true,
    language: 'en', timezone: 'UTC-5', dateFormat: 'MM/DD/YYYY'
  });

  const fetchSettings = async () => {
    setRefreshing(true);
    try {
      const res = await axios.get('http://localhost:5000/api/settings');
      if (res.data.success && Object.keys(res.data.settings).length > 0) {
        setSettings(prev => ({ ...prev, ...res.data.settings }));
      } else {
        const initRes = await axios.post('http://localhost:5000/api/settings/init');
        if (initRes.data.success) fetchSettings();
      }
    } catch (err) { console.error('Error fetching settings:', err); }
    setRefreshing(false);
  };

  useEffect(() => { fetchSettings(); }, []);

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:5000/api/settings', settings);
      alert('Settings updated successfully!');
    } catch (err) { alert('Failed to save settings'); }
  };

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'appearance', name: 'Appearance', icon: Monitor },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'language', name: 'Language', icon: Globe },
    { id: 'security', name: 'Security', icon: Shield }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div><h2 className="text-2xl font-bold text-gray-800">Settings Management</h2><p className="text-gray-500 text-sm">Configure system settings globally</p></div>
        <button onClick={fetchSettings} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
          <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} /> Refresh Configurations
        </button>
      </div>
      <div className="flex gap-2 border-b border-gray-200 mb-6 overflow-x-auto">
        {tabs.map(tab => { const Icon = tab.icon; return (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 font-medium transition flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}><Icon size={18} /> {tab.name}</button>); })}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Settings size={18}/> General Settings</h3>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Platform Name</label><input type="text" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" value={settings.siteName} onChange={e => setSettings({...settings, siteName: e.target.value})} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Administrative Email</label><input type="email" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" value={settings.siteEmail} onChange={e => setSettings({...settings, siteEmail: e.target.value})} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label><input type="tel" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" value={settings.sitePhone} onChange={e => setSettings({...settings, sitePhone: e.target.value})} /></div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Bell size={18}/> Push Notification Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between"><span>Email Routing Activation</span><button onClick={() => setSettings({...settings, emailNotifications: !settings.emailNotifications})} className={`w-12 h-6 rounded-full transition ${settings.emailNotifications ? 'bg-green-600' : 'bg-gray-300'}`}><div className={`w-5 h-5 rounded-full bg-white transform transition ${settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'}`}></div></button></div>
            <div className="flex items-center justify-between"><span>SMS Triggers</span><button onClick={() => setSettings({...settings, smsNotifications: !settings.smsNotifications})} className={`w-12 h-6 rounded-full transition ${settings.smsNotifications ? 'bg-green-600' : 'bg-gray-300'}`}><div className={`w-5 h-5 rounded-full bg-white transform transition ${settings.smsNotifications ? 'translate-x-6' : 'translate-x-1'}`}></div></button></div>
            <div className="flex items-center justify-between"><span>Database Auto-Backup Sync</span><button onClick={() => setSettings({...settings, autoBackup: !settings.autoBackup})} className={`w-12 h-6 rounded-full transition ${settings.autoBackup ? 'bg-green-600' : 'bg-gray-300'}`}><div className={`w-5 h-5 rounded-full bg-white transform transition ${settings.autoBackup ? 'translate-x-6' : 'translate-x-1'}`}></div></button></div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Monitor size={18}/> Appearance Modifiers</h3>
          <div className="flex items-center justify-between"><span>Force Dark Mode UI</span><button onClick={() => setSettings({...settings, darkMode: !settings.darkMode})} className={`w-12 h-6 rounded-full transition ${settings.darkMode ? 'bg-indigo-600' : 'bg-gray-300'}`}><div className={`w-5 h-5 rounded-full bg-white transform transition ${settings.darkMode ? 'translate-x-6' : 'translate-x-1'}`}></div></button></div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Globe size={18}/> Regional Formatting</h3>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Global Dialect</label><select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" value={settings.language} onChange={e => setSettings({...settings, language: e.target.value})}><option value="en">English (US)</option><option value="es">Spanish</option><option value="fr">French</option><option value="de">German</option></select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Platform Time Zone</label><select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" value={settings.timezone} onChange={e => setSettings({...settings, timezone: e.target.value})}><option value="UTC-5">Eastern Time (UTC-5)</option><option value="UTC-8">Pacific Time (UTC-8)</option><option value="UTC+0">GMT (UTC+0)</option></select></div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button onClick={handleSave} className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition flex items-center gap-2 shadow-lg">
          <CheckCircle size={20} /> Save All Configurations
        </button>
      </div>
    </div>
  );
};

// Edit User Modal
const EditUserModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...user });
  const [isSaving, setIsSaving] = useState(false);
  const handleSubmit = async (e) => { e.preventDefault(); setIsSaving(true); await onSave(formData); setIsSaving(false); };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold">Edit User</h2><button onClick={onClose}><X size={20} /></button></div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label>Full Name</label><input type="text" className="w-full px-3 py-2 border rounded-lg" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} /></div>
          <div><label>Email</label><input type="email" className="w-full px-3 py-2 border rounded-lg" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></div>
          <div><label>Phone</label><input type="tel" className="w-full px-3 py-2 border rounded-lg" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} /></div>
          <div><label>Role</label><select className="w-full px-3 py-2 border rounded-lg" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}><option value="student">Student</option><option value="admin">Admin</option></select></div>
          <div className="flex gap-3 pt-4"><button type="button" onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg">Cancel</button><button type="submit" disabled={isSaving} className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg">{isSaving ? 'Saving...' : 'Save Changes'}</button></div>
        </form>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeManagement, setActiveManagement] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [stats, setStats] = useState({ total: 0, pending: 0, accepted: 0, rejected: 0 });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/auth/users');
        if (response.data.success) {
          setUsers(response.data.users);
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const managementModules = [
    { id: 'enrollment', title: 'Enrollment Management', icon: Users, description: 'Review student applications', color: 'bg-gradient-to-r from-blue-500 to-blue-600', stats: { value: stats.pending.toString(), label: 'Pending' }, requiredPassword: 'riana123' },
    { id: 'course', title: 'Course Management', icon: BookOpen, description: 'Manage academic courses', color: 'bg-gradient-to-r from-green-500 to-green-600', stats: { value: '0', label: 'Courses' }, requiredPassword: 'malith123' },
    { id: 'requirements', title: 'Requirements Management', icon: ClipboardList, description: 'Manage admission requirements', color: 'bg-gradient-to-r from-indigo-500 to-indigo-600', stats: { value: '0', label: 'Requirements' }, requiredPassword: 'riana123' },
    { id: 'contact', title: 'Contact & Support', icon: Headphones, description: 'Manage support tickets', color: 'bg-gradient-to-r from-purple-500 to-purple-600', stats: { value: '0', label: 'Open' }, requiredPassword: 'dulari123' },
    { id: 'event', title: 'Event Management', icon: Calendar, description: 'Manage university events', color: 'bg-gradient-to-r from-orange-500 to-orange-600', stats: { value: '0', label: 'Events' }, requiredPassword: 'malith123' },
    { id: 'user', title: 'User Management', icon: UserCheck, description: 'Manage users', color: 'bg-gradient-to-r from-yellow-500 to-yellow-600', stats: { value: users.length.toString(), label: 'Users' }, requiredPassword: 'sehara123' },
    { id: 'student', title: 'Student Management', icon: GraduationCap, description: 'Manage students', color: 'bg-gradient-to-r from-pink-500 to-pink-600', stats: { value: users.filter(u => u.role === 'student').length.toString(), label: 'Students' }, requiredPassword: 'sehara123' },
    { id: 'settings', title: 'Settings Management', icon: Settings, description: 'Configure system settings', color: 'bg-gradient-to-r from-gray-500 to-gray-600', stats: { value: '12', label: 'Settings' }, requiredPassword: 'riana123' }
  ];

  const handleCardClick = (module) => { setPendingAction(module); setShowPasswordModal(true); };
  const handlePasswordSuccess = () => { if (pendingAction) { setActiveManagement(pendingAction.id); } };
  const handleEditUser = (user) => { setEditingUser(user); setShowEditModal(true); };
  const handleUpdateUser = async (id, data) => { alert('User updated!'); setShowEditModal(false); };
  const handleDeleteUser = async (id) => { if (window.confirm('Delete user?')) { alert('User deleted!'); } };

  const renderManagementContent = () => {
    switch (activeManagement) {
      case 'enrollment': return <EnrollmentManagement />;
      case 'course': return <CourseManagement />;
      case 'requirements': return <RequirementsManagement />;
      case 'contact': return <ContactSupportManagement />;
      case 'event': return <EventManagement />;
      case 'user': return <UserManagement users={users} loading={loading} />;
      case 'student': return <StudentManagement />;
      case 'settings': return <SettingsManagement />;
      default: return null;
    }
  };

  const getManagementTitle = () => { const module = managementModules.find(m => m.id === activeManagement); return module ? module.title : ''; };

  if (activeManagement) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-green-600 to-green-800 pt-20 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <button onClick={() => setActiveManagement(null)} className="text-white hover:text-green-200 transition flex items-center gap-2"><ChevronLeft size={24} /> Back to Dashboard</button>
              <div className="flex gap-3"><button className="bg-white/10 text-white px-4 py-2 rounded-lg"><Printer size={18} /> Print</button><button onClick={() => navigate('/')} className="bg-white/10 text-white px-4 py-2 rounded-lg"><LogOut size={18} /> Logout</button></div>
            </div>
            <h1 className="text-3xl font-bold text-white mt-6">{getManagementTitle()}</h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div className="bg-white rounded-xl shadow-lg overflow-hidden">{renderManagementContent()}</div></div>
        {showEditModal && editingUser && <EditUserModal user={editingUser} onClose={() => { setShowEditModal(false); setEditingUser(null); }} onSave={handleUpdateUser} />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {showPasswordModal && pendingAction && <PasswordModal title={pendingAction.title} onClose={() => { setShowPasswordModal(false); setPendingAction(null); }} onSuccess={handlePasswordSuccess} expectedPassword={pendingAction.requiredPassword} />}
      <div className="bg-gradient-to-r from-green-600 to-green-800 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4"><LayoutDashboard className="text-white" size={40} /><div><h1 className="text-2xl font-bold text-white">Admin Dashboard</h1><p className="text-green-100">Welcome back, Administrator</p></div></div>
            <div className="flex gap-3"><button className="bg-white/10 text-white px-4 py-2 rounded-lg"><Printer size={18} /> Print</button><button onClick={() => navigate('/')} className="bg-white/10 text-white px-4 py-2 rounded-lg"><LogOut size={18} /> Logout</button></div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8"><h2 className="text-2xl font-bold text-gray-800">Management Modules</h2><p className="text-gray-500">Select a module to manage different aspects of the university</p></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{managementModules.map(module => (<ManagementCard key={module.id} icon={module.icon} title={module.title} description={module.description} color={module.color} stats={module.stats} onClick={() => handleCardClick(module)} />))}</div>
      </div>
      <div className="bg-white border-t border-gray-100 py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-2xl font-bold text-green-600">95%</div><div className="text-sm text-gray-500">Student Satisfaction</div></div>
            <div><div className="text-2xl font-bold text-green-600">50+</div><div className="text-sm text-gray-500">Academic Programs</div></div>
            <div><div className="text-2xl font-bold text-green-600">{users.length}</div><div className="text-sm text-gray-500">Total Registered Users</div></div>
            <div><div className="text-2xl font-bold text-green-600">24/7</div><div className="text-sm text-gray-500">Support Available</div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;