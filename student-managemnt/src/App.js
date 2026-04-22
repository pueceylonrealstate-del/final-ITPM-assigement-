import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Registration from './components/registration/Registration';
import Program from './components/program/Program';
import Details from './components/program/Details';
import Payment from './components/payment/Payment';
import Login from './components/auth/Login';
import StudentProfile from './components/student/StudentProfile';
import Contact from './components/contact/Contact';
import StudentLife from './components/studentlife/StudentLife';
import Admission from './components/admission/Admission';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/programs" element={<Program />} />
          <Route path="/details" element={<Details />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/student-life" element={<StudentLife />} />
          <Route path="/admissions" element={<Admission />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;