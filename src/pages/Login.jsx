import React, { useState } from 'react';
import { requestOtp, verifyOtp } from '../services/authService.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';


export default function Login() {
const [email, setEmail] = useState('');
const [otp, setOtp] = useState('');
const [stage, setStage] = useState('email');
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const { login } = useAuth();
const nav = useNavigate();




async function sendOtp(e) {
e.preventDefault();
setError('');
setLoading(true);
try {
const otpResult = await requestOtp(email);

 console.log(otpResult.otp)
alert(`This is required otp : ${otpResult.otp}`);
setStage('otp');
} catch (e) {
setError(e?.response?.data?.message || 'Failed to send OTP');
} finally { setLoading(false); }
}


async function handleVerify(e) {
e.preventDefault();
setError('');
setLoading(true);
try {
const { token, user } = await verifyOtp(email, otp);
login(token, user);
nav('/dashboard');
} catch (e) {
setError(e?.response?.data?.message || 'Invalid OTP');
} finally { setLoading(false); }
}


return (
<div>
<h2 className="header">Login</h2>
{error && <div className="card" style={{ borderColor: '#ef4444' }}>{error}</div>}


{stage === 'email' ? (
<form onSubmit={sendOtp}>
<input className="input" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
<button className="btn btn-primary" disabled={loading}>{loading ? 'Sending...' : 'Send OTP'}</button>
</form>
) : (

<form onSubmit={handleVerify}>
<input className="input" type="text" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} required />
<button className="btn btn-primary" disabled={loading}>{loading ? 'Verifying...' : 'Verify & Login'}</button>
</form>
)}

 

<p className="small" style={{ marginTop: 12 }}>No account? <Link to="/signup">Signup</Link></p>
</div>
);
}