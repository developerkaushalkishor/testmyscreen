'use client';

import { useState } from 'react';
import { Send, Mail, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Here you would typically send the form data to your backend
      // For now, we'll just simulate a submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Send email using mailto link as a fallback
      window.location.href = `mailto:contactfresherjobzone@gmail.com?subject=Contact from ${formData.name}&body=${formData.message}`;
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.08),transparent_50%)]" />

        <main className="relative max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:py-24">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Contact UrgentHai
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              We&apos;d love to hear from you! Whether you have feedback about our Screen Test Suite,
              need help with a tool, or just want to say hi, feel free to get in touch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Reach Out</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Email</h3>
                    <p className="text-gray-400">contactfresherjobzone@gmail.com</p>
                    <p className="text-sm text-gray-500 mt-1">We aim to reply within 24-48 hours.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <Clock className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Response Time</h3>
                    <p className="text-gray-400">We aim to reply within 24-48 hours.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <MapPin className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Location</h3>
                    <p className="text-gray-400">Bangkok, Thailand</p>
                    <p className="text-sm text-gray-500 mt-1">(General inquiries only; no physical visits, please!)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="input w-full"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="input w-full"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    rows={5}
                    className="input w-full"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button-primary w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <p className="text-green-400 text-sm text-center">
                    Thank you for your message! We&apos;ll get back to you soon.
                  </p>
                )}

                {submitStatus === 'error' && (
                  <p className="text-red-400 text-sm text-center">
                    Something went wrong. Please try again later.
                  </p>
                )}
              </form>

              <p className="text-sm text-gray-400 mt-6 text-center">
                Your input helps us improve. Let&apos;s make your screen experience better together!
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 