import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaBuilding, 
  FaEnvelope, 
  FaPhone,
  FaGraduationCap,
  FaCheckCircle,
  FaArrowRight,
  FaArrowLeft
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { events, passTypes } from '../data/events';

// API URLs
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzIRFnPzYhaJfCVIMv2Ykgsje4dXcY0s2uoHign5wDWGR-VEz8mUIfL2AWXDRbQ_0ePww/exec';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Registration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPaymentPending, setShowPaymentPending] = useState(false);
  const [registrationId, setRegistrationId] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState('');
  
  const [formData, setFormData] = useState({
    participantName: '',
    college: '',
    email: '',
    phone: '',
    year: '',
    lunchPreference: 'non-veg',
    selectedEvents: [],
    passType: '',
    additionalMembers: []
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const selectedPass = passTypes.find(p => p.id === formData.passType);
  const totalMembers = selectedPass?.members || 1;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEventToggle = (eventId) => {
    setFormData(prev => ({
      ...prev,
      selectedEvents: prev.selectedEvents.includes(eventId)
        ? prev.selectedEvents.filter(id => id !== eventId)
        : [...prev.selectedEvents, eventId]
    }));
  };

const handlePassChange = (passId) => {
  const pass = passTypes.find(p => p.id === passId);

  setFormData(prev => ({
    ...prev,
    passType: passId,
    additionalMembers: pass.members > 1
      ? Array.from({ length: pass.members - 1 }, () => ({
          name: '',
          college: '',
          email: '',
          phone: '',
          year: '',
          lunchPreference: 'non-veg'
        }))
      : []
  }));
};

  const handleMemberChange = (index, field, value) => {
    setFormData(prev => {
      const newMembers = [...prev.additionalMembers];
      newMembers[index] = { ...newMembers[index], [field]: value };
      return { ...prev, additionalMembers: newMembers };
    });
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.participantName || !formData.college || !formData.email || !formData.phone || !formData.year) {
          toast.error('Please fill in all fields');
          return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          toast.error('Please enter a valid email');
          return false;
        }
        if (!/^\d{10}$/.test(formData.phone)) {
          toast.error('Please enter a valid 10-digit phone number');
          return false;
        }
        return true;
      case 2:
        if (formData.selectedEvents.length === 0) {
          toast.error('Please select at least one event');
          return false;
        }
        if (!formData.passType) {
          toast.error('Please select a pass type');
          return false;
        }
        return true;
      case 3:
        for (let i = 0; i < formData.additionalMembers.length; i++) {
          const member = formData.additionalMembers[i];
          if (!member.name || !member.college || !member.email || !member.phone || !member.year) {
            toast.error(`Please fill in all details for member ${i + 2}`);
            return false;
          }
        }
        return true;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    
    setLoading(true);
    const regId = `TECH26-${Date.now().toString(36).toUpperCase()}`;
    setRegistrationId(regId);

    try {
      // Show payment pending screen instead of processing immediately
      setShowPaymentPending(true);
      toast.success('Please complete your payment to finalize registration');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection for payment screenshot
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (PNG, JPG, JPEG)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setPaymentScreenshot(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setScreenshotPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handlePaymentConfirmation = async () => {
    // Validate screenshot upload
    if (!paymentScreenshot) {
      toast.error('Please upload payment screenshot');
      return;
    }

    setLoading(true);
    
    try {
      // Convert image to base64
      const base64Image = await fileToBase64(paymentScreenshot);

    
let allParticipants = [
  {
    name: formData.participantName?.trim(),
    college: formData.college?.trim(),
    email: formData.email?.trim(),
    phone: formData.phone?.trim(),
    year: formData.year?.trim(),
    lunchPreference: formData.lunchPreference || 'non-veg'
  }
];

      
      // Add additional members only if they have data
      if (formData.additionalMembers && formData.additionalMembers.length > 0) {
        formData.additionalMembers.forEach(member => {
     if (
  member &&
  member.name?.trim() &&
  member.email?.trim() &&
  member.phone?.trim() &&
  member.college?.trim() &&
  member.year?.trim()
) {
  allParticipants.push({
    name: member.name.trim(),
    email: member.email.trim(),
    phone: member.phone.trim(),
    college: member.college.trim(),
    year: member.year.trim(),
    lunchPreference: member.lunchPreference || 'non-veg'
  });
}
        });
      }
// FINAL CLEANING (IMPORTANT)
const cleanedParticipants = allParticipants.filter(
  p =>
    p &&
    p.name &&
    p.email &&
    p.college &&
    p.phone &&
    p.year
);

if (cleanedParticipants.length === 0) {
  toast.error("No valid participants found.");
  setLoading(false);
  return;
}
      const allEventNames = formData.selectedEvents.map(id => {
        const allEvents = [...events.technical, ...events.nonTechnical];
        return allEvents.find(e => e.id === id)?.name;
      }).filter(Boolean);

      // Prepare data for Google Apps Script
      const payload = {
        timestamp: new Date().toISOString(),
        registrationId: registrationId,
        eventNames: allEventNames.join(', '),
        participants: cleanedParticipants,
        passType: selectedPass?.name,
        amount: selectedPass?.price,
        paymentScreenshot: base64Image,
        filename: `${registrationId}_${paymentScreenshot.name}`
      };

      console.log('Submitting to Google Apps Script...', { registrationId });

      // Send to Google Apps Script
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'no-cors' // Required for Google Apps Script
      });

      // Send confirmation emails via backend (Gmail)
      console.log('Sending confirmation emails via Gmail...');
      try {
        const emailResponse = await fetch(`${API_URL}/api/send-emails`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            recipients: cleanedParticipants.map(p => ({ name: p.name, email: p.email })),
            registrationId: registrationId,
            eventNames: allEventNames.join(', '),
            passType: selectedPass?.name,
            amount: selectedPass?.price,
            college: formData.college
          })
        });
        
        const emailResult = await emailResponse.json();
        console.log('Email result:', emailResult);
        
        if (emailResult.success) {
          toast.success(`Registration submitted! Confirmation emails sent to ${emailResult.results.length} participant(s).`);
        } else {
          toast.success('Registration submitted! Email notification may be delayed.');
        }
      } catch (emailErr) {
        console.error('Email sending failed:', emailErr);
        toast.success('Registration submitted! We will send confirmation email shortly.');
      }
      
      setPaymentConfirmed(true);
      setShowSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(`Submission failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const upiUrl = `upi://pay?pa=kavinak445@okaxis&pn=Technovate%202026&am=${selectedPass?.price || 0}&cu=INR&tn=${encodeURIComponent(`Technovate2026-${registrationId}`)}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUrl)}`;

  const steps = [
    { number: 1, title: 'Personal Details' },
    { number: 2, title: 'Select Events' },
    { number: 3, title: 'Payment' }
  ];

  if (showPaymentPending && !paymentConfirmed) {
    return (
      <div className="section-padding">
        <div className="container-wide max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-3xl p-8"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaArrowRight className="w-10 h-10 text-white rotate-90" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Complete Payment</h2>
              <p className="text-slate-400">Scan the QR code to complete your registration</p>
            </div>

            <div className="glass-card rounded-2xl p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-400">Registration ID</span>
                <span className="font-mono font-bold text-cyan-400">{registrationId}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-400">Pass Type</span>
                <span className="text-white">{selectedPass?.name}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                <span className="text-lg font-semibold text-white">Total Amount</span>
                <span className="text-3xl font-bold gradient-text">₹{selectedPass?.price}</span>
              </div>
            </div>

            {/* Payment Instructions */}
            <div className="text-center mb-6">
              <p className="text-slate-300 mb-4">Scan with any UPI app to pay</p>
              <div className="bg-white p-4 rounded-2xl inline-block mb-4">
                <img src={qrCodeUrl} alt="UPI QR Code" className="w-48 h-48" />
              </div>
              <p className="font-mono text-cyan-400 mb-2">kavinak445@okaxis</p>
              <p className="text-slate-400 text-sm">UPI ID for payment</p>
            </div>

            {/* Payment Screenshot Upload */}
            <div className="glass-card rounded-xl p-6 mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Payment Screenshot with Transaction ID [available in chat of payment] <span className="text-red-500">*</span>
              </label>
              
              {/* File Input */}
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileChange}
                className="hidden"
                id="payment-screenshot"
              />
              
              {/* Upload Button */}
              <label
                htmlFor="payment-screenshot"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer hover:border-cyan-500 hover:bg-slate-800/50 transition-all"
              >
                {screenshotPreview ? (
                  <img 
                    src={screenshotPreview} 
                    alt="Payment Screenshot Preview" 
                    className="h-full w-auto object-contain rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <svg className="w-8 h-8 text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-slate-400">Click to upload screenshot</span>
                    <span className="text-xs text-slate-500 mt-1">PNG, JPG (Max 5MB)</span>
                  </div>
                )}
              </label>
              
              {paymentScreenshot && (
                <p className="text-cyan-400 text-xs mt-2 text-center">
                  ✓ {paymentScreenshot.name} selected
                </p>
              )}
              
              <p className="text-slate-400 text-xs mt-3">
                Upload a clear screenshot of your payment confirmation from your UPI app
              </p>
              
              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-blue-400 text-xs">
                  <strong>Note:</strong> Please ensure the screenshot clearly displays the transaction ID or UTR number from your payment confirmation. This information is typically available in your UPI app payment history or chat section after completing the transaction.
                </p>
              </div>
            </div>

            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl mb-6">
              <p className="text-amber-400 text-sm text-center">
                <strong>Important:</strong> Upload a clear screenshot of your payment confirmation after completing payment.
              </p>
            </div>

            <button
              onClick={handlePaymentConfirmation}
              disabled={loading || !paymentScreenshot}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <FaCheckCircle className="w-5 h-5" />
                  Complete Registration
                </>
              )}
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="section-padding">
        <div className="container-wide max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-3xl p-8"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Registration Confirmed!</h2>
              <p className="text-slate-400">Your payment has been received and registration is complete</p>
            </div>

            <div className="glass-card rounded-2xl p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-400">Registration ID</span>
                <span className="font-mono font-bold text-cyan-400">{registrationId}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-400">Pass Type</span>
                <span className="text-white">{selectedPass?.name}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                <span className="text-lg font-semibold text-white">Amount Paid</span>
                <span className="text-3xl font-bold gradient-text">₹{selectedPass?.price}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/')}
              className="btn-primary w-full"
            >
              Back to Home
            </button>

            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
              <p className="text-green-400 text-sm text-center">
                <strong>Success!</strong> Confirmation emails have been sent to all team members. Please check your inbox.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-wide max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Event <span className="gradient-text">Registration</span>
          </h1>
          <p className="text-slate-400">Secure your spot at Technovate 2026</p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                  step >= s.number 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {s.number}
                </div>
                <span className={`ml-2 text-sm hidden sm:block ${
                  step >= s.number ? 'text-white' : 'text-slate-500'
                }`}>
                  {s.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    step > s.number ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'bg-slate-800'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass-card rounded-3xl p-6 md:p-10"
        >
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Personal Details</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <FaUser className="w-4 h-4 inline mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="participantName"
                    value={formData.participantName}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <FaBuilding className="w-4 h-4 inline mr-2" />
                    College Name *
                  </label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter your college name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <FaEnvelope className="w-4 h-4 inline mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <FaPhone className="w-4 h-4 inline mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter 10-digit phone number"
                    maxLength={10}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <FaGraduationCap className="w-4 h-4 inline mr-2" />
                    Year of Study *
                  </label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="">Select your year</option>
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Lunch Preference *
                  </label>
                  <select
                    name="lunchPreference"
                    value={formData.lunchPreference}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="non-veg">Non-Veg</option>
                    <option value="veg">Veg</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Select Events</h2>
              
              <div className="space-y-4">
                <p className="text-slate-400 text-sm mb-4">Select the events you want to participate in:</p>
                {[...events.technical, ...events.nonTechnical].map((event) => (
                  <label
                    key={event.id}
                    className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.selectedEvents.includes(event.id)
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.selectedEvents.includes(event.id)}
                      onChange={() => handleEventToggle(event.id)}
                      className="w-5 h-5 rounded border-slate-600 text-cyan-500 focus:ring-cyan-500"
                    />
                    <div className="ml-3 w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <event.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-white">{event.name}</p>
                      <p className="text-sm text-slate-400">{event.shortDescription}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Select Pass Type</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {passTypes.map((pass) => (
                    <label
                      key={pass.id}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        formData.passType === pass.id
                          ? 'border-cyan-500 bg-cyan-500/10'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="passType"
                        value={pass.id}
                        checked={formData.passType === pass.id}
                        onChange={() => handlePassChange(pass.id)}
                        className="sr-only"
                      />
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-white">{pass.name}</p>
                          <p className="text-sm text-slate-400">{pass.members} Member{pass.members > 1 ? 's' : ''}</p>
                        </div>
                        <p className="text-xl font-bold gradient-text">₹{pass.price}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Additional Members</h2>
              
              {totalMembers > 1 ? (
                <div className="space-y-6">
                  <p className="text-slate-400">
                    Please enter details for {totalMembers - 1} additional member{totalMembers > 2 ? 's' : ''}:
                  </p>
                  {formData.additionalMembers.map((member, index) => (
                    <div key={index} className="glass-card rounded-xl p-6">
                      <h3 className="font-semibold text-white mb-4">Member {index + 2}</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={member.name}
                          onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                          className="input-field"
                        />
                        <input
                          type="text"
                          placeholder="College Name"
                          value={member.college}
                          onChange={(e) => handleMemberChange(index, 'college', e.target.value)}
                          className="input-field"
                        />
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={member.email}
                          onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                          className="input-field"
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={member.phone}
                          onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                          className="input-field"
                          maxLength={10}
                        />
                        <select
                          value={member.year}
                          onChange={(e) => handleMemberChange(index, 'year', e.target.value)}
                          className="input-field"
                        >
                          <option value="">Select Year</option>
                          <option value="1st">1st Year</option>
                          <option value="2nd">2nd Year</option>
                          <option value="3rd">3rd Year</option>
                          <option value="4th">4th Year</option>
                        </select>
                        <select
                          value={member.lunchPreference}
                          onChange={(e) => handleMemberChange(index, 'lunchPreference', e.target.value)}
                          className="input-field"
                        >
                          <option value="non-veg">Non-Veg</option>
                          <option value="veg">Veg</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400">No additional members required for Individual Pass.</p>
              )}

              <div className="glass-card rounded-xl p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
                <h3 className="text-lg font-semibold text-white mb-4">Payment Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-slate-300">
                    <span>Pass Type</span>
                    <span>{selectedPass?.name}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Events</span>
                    <span>{formData.selectedEvents.length} selected</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Members</span>
                    <span>{totalMembers}</span>
                  </div>
                  <div className="pt-4 border-t border-slate-700 flex justify-between items-center">
                    <span className="text-lg font-semibold text-white">Total Amount</span>
                    <span className="text-3xl font-bold gradient-text">₹{selectedPass?.price}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                <p className="text-amber-400 text-sm">
                  <strong>Note:</strong> After clicking "Complete Registration", you will see the payment QR code. 
                  All team members will receive confirmation emails with registration details.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-slate-700">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="btn-secondary flex items-center gap-2"
              >
                <FaArrowLeft className="w-5 h-5" />
                Back
              </button>
            ) : (
              <div />
            )}
            
            {step < 3 ? (
              <button
                onClick={() => validateStep() && setStep(step + 1)}
                className="btn-primary flex items-center gap-2"
              >
                Next
                <FaArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Complete Registration
                    <FaArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Registration;
