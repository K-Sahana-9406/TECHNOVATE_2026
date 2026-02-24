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

// Backend API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Registration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPaymentPending, setShowPaymentPending] = useState(false);
  const [registrationId, setRegistrationId] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [showVerificationPending, setShowVerificationPending] = useState(false);
  
  const [formData, setFormData] = useState({
    participantName: '',
    college: '',
    email: '',
    phone: '',
    year: '',
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
        ? Array(pass.members - 1).fill({ name: '', college: '', email: '', phone: '', year: '' })
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

  const handlePaymentConfirmation = async () => {
    // Validate transaction ID - must be exactly 12 digits
    const trimmedTransactionId = transactionId.trim();
    if (!trimmedTransactionId) {
      toast.error('Please enter UPI Transaction ID');
      return;
    }
    if (!/^\d{12}$/.test(trimmedTransactionId)) {
      toast.error('Transaction ID must be exactly 12 digits');
      return;
    }

    setLoading(true);
    
    try {
      const allParticipants = [
        {
          name: formData.participantName,
          college: formData.college,
          email: formData.email,
          phone: formData.phone,
          year: formData.year
        },
        ...formData.additionalMembers
      ];

      const allEventNames = formData.selectedEvents.map(id => {
        const allEvents = [...events.technical, ...events.nonTechnical];
        return allEvents.find(e => e.id === id)?.name;
      }).filter(Boolean);

      // Step 1: Submit to Google Sheets via backend (AFTER payment)
      console.log('Submitting to sheets...', { registrationId });
      const sheetsResponse = await fetch(`${API_URL}/api/submit-to-sheets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          registrationId: registrationId,
          eventNames: allEventNames.join(', '),
          participants: allParticipants,
          passType: selectedPass?.name,
          amount: selectedPass?.price
        })
      });

      if (!sheetsResponse.ok) {
        const errorText = await sheetsResponse.text();
        throw new Error(`Sheets API error: ${sheetsResponse.status} - ${errorText}`);
      }

      const sheetsResult = await sheetsResponse.json();
      console.log('Sheets result:', sheetsResult);

      if (!sheetsResult.success) {
        throw new Error(sheetsResult.error || 'Failed to save to spreadsheet');
      }

      // Step 2: Send confirmation email (registration complete)
      console.log('Sending confirmation email...');
      const emailResponse = await fetch(`${API_URL}/api/send-bulk-emails`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipients: allParticipants.map(p => ({ name: p.name, email: p.email })),
          registration_id: registrationId,
          event_name: allEventNames.join(', '),
          pass_type: selectedPass?.name,
          amount: selectedPass?.price,
          college: formData.college,
          team_members_list: allParticipants.map(p => p.name).join(', ')
        })
      });

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        throw new Error(`Email API error: ${emailResponse.status} - ${errorText}`);
      }

      const emailResult = await emailResponse.json();
      console.log('Email result:', emailResult);

      toast.success('Registration completed successfully!');
      setPaymentConfirmed(true);
      setShowSuccess(true);
    } catch (error) {
      console.error('Payment confirmation error:', error);
      toast.error(`Submission failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const upiUrl = `upi://pay?pa=tgokila459@okhdfcbank&pn=Technovate%202026&am=${selectedPass?.price || 0}&cu=INR&tn=${encodeURIComponent(`Technovate2026-${registrationId}`)}`;
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
              <p className="font-mono text-cyan-400 mb-2">tgokila459@okhdfcbank</p>
              <p className="text-slate-400 text-sm">UPI ID for payment</p>
            </div>

            {/* Transaction ID Input */}
            <div className="glass-card rounded-xl p-6 mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-3">
                UPI Transaction ID (UTR/Reference Number) *
              </label>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="input-field w-full"
                placeholder="Enter 12-digit UTR number"
                maxLength={12}
              />
              <p className="text-slate-400 text-xs mt-2">
                Find this 12-digit number in your UPI app payment history
              </p>
            </div>

            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl mb-6">
              <p className="text-amber-400 text-sm text-center">
                <strong>Important:</strong> Enter your UPI Transaction ID after completing payment.
              </p>
            </div>

            <button
              onClick={handlePaymentConfirmation}
              disabled={loading || !transactionId.trim()}
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

  if (showVerificationPending) {
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
                <FaCheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Payment Details Submitted!</h2>
              <p className="text-slate-400">Your registration is pending verification</p>
            </div>

            <div className="glass-card rounded-2xl p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-400">Registration ID</span>
                <span className="font-mono font-bold text-cyan-400">{registrationId}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-400">Transaction ID</span>
                <span className="font-mono font-bold text-cyan-400">{transactionId}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-400">Pass Type</span>
                <span className="text-white">{selectedPass?.name}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                <span className="text-lg font-semibold text-white">Amount</span>
                <span className="text-3xl font-bold gradient-text">₹{selectedPass?.price}</span>
              </div>
            </div>

            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl mb-6">
              <p className="text-amber-400 text-sm text-center">
                <strong>Next Steps:</strong> Our team will verify your payment within 24 hours. You will receive a confirmation email once verified.
              </p>
            </div>

            <button
              onClick={() => navigate('/')}
              className="btn-primary w-full"
            >
              Back to Home
            </button>

            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
              <p className="text-blue-400 text-sm text-center">
                <strong>Note:</strong> Save your Registration ID for future reference.
              </p>
            </div>
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
                          className="input-field md:col-span-2"
                        >
                          <option value="">Select Year</option>
                          <option value="1st">1st Year</option>
                          <option value="2nd">2nd Year</option>
                          <option value="3rd">3rd Year</option>
                          <option value="4th">4th Year</option>
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
