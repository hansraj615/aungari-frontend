import React, { useState } from 'react';
import axios from 'axios';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/contact', form);
      setSuccess('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setSuccess('Failed to send. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Contact Us</h2>
      {success && <div className="alert alert-info">{success}</div>}
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your Name" required />
        <input className="form-control mb-2" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Your Email" required />
        <textarea className="form-control mb-2" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Your Message" required />
        <button className="btn btn-danger">Send</button>
      </form>
    </div>
  );
}
