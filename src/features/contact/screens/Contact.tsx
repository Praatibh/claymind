/**
 * Contact Screen
 * Contact form with validation and FAQ section
 */

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'motion/react';
import {
  MessageCircle,
  Mail,
  Heart,
  User,
  HelpCircle,
  Send,
  AlertCircle,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { Card3D } from '../../../app/components/3d-card';
import { Button3D } from '../../../app/components/3d-button';
import { FloatingMascot } from '../../../app/components/floating-mascot';
import { contactService, type FAQ } from '../../../lib/services/contact.service';

// Subject options
const SUBJECT_OPTIONS = [
  'Technical Issue',
  'Question about Lessons',
  'Account Help',
  'General Feedback',
  'Other',
] as const;

// Validation schema
const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  subject: z.enum(SUBJECT_OPTIONS, {
    errorMap: () => ({ message: 'Please select a subject' }),
  }),
  message: z
    .string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function Contact() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [submitMessage, setSubmitMessage] = useState<string>('');
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [faqsLoading, setFaqsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: 'Technical Issue',
      message: '',
    },
  });

  // Load FAQs on mount
  useEffect(() => {
    async function loadFAQs() {
      try {
        const data = await contactService.getFAQs();
        setFaqs(data);
      } catch {
        // Fallback to default FAQs on error
        setFaqs([
          {
            question: 'How do I start learning?',
            answer:
              'Just sign up, choose a module that interests you, and start with the first lesson!',
          },
          {
            question: 'Is ClayMind really safe for kids?',
            answer:
              'Yes! We have content filters, parental controls, and all activities are monitored to ensure a safe learning environment.',
          },
          {
            question: 'Can I share my projects?',
            answer:
              'Yes! You can share your projects with friends and family directly from your project gallery.',
          },
          {
            question: 'What if I need help with a lesson?',
            answer:
              'Each lesson has built-in hints and tips. You can also ask for help in the support section!',
          },
        ]);
      } finally {
        setFaqsLoading(false);
      }
    }
    loadFAQs();
  }, []);

  const isLoading = isSubmitting || formStatus === 'loading';

  const onSubmit = async (data: ContactFormData) => {
    try {
      setFormStatus('loading');
      setSubmitMessage('');

      const response = await contactService.sendMessage(data);

      setFormStatus('success');
      setSubmitMessage(response.message || 'Your message has been sent successfully!');
      reset();

      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
        setSubmitMessage('');
      }, 5000);
    } catch (error) {
      setFormStatus('error');
      setSubmitMessage(
        error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      );
    }
  };

  const inputClassName = (hasError: boolean) =>
    `w-full px-6 py-4 rounded-2xl bg-purple-50 border-2 transition-all outline-none ${
      hasError
        ? 'border-red-400 focus:border-red-500'
        : 'border-purple-100 focus:border-purple-500'
    } disabled:opacity-50 disabled:cursor-not-allowed`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-center mb-6">
            <FloatingMascot size="lg" message="I'm here to help!" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Need Help?</h1>
          <p className="text-xl text-gray-600">We're here to support your learning journey!</p>
        </motion.div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card3D variant="primary" hover className="h-full cursor-pointer">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Live Chat Support</h3>
                <p className="text-white/90 mb-6">
                  Chat with our friendly support team in real-time
                </p>
                <Button3D variant="glass" size="lg" className="w-full">
                  Start Chat
                </Button3D>
              </div>
            </Card3D>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card3D variant="accent" hover className="h-full cursor-pointer">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Email Us</h3>
                <p className="text-white/90 mb-6">
                  Send us a message and we'll get back to you soon
                </p>
                <Button3D variant="glass" size="lg" className="w-full">
                  Send Email
                </Button3D>
              </div>
            </Card3D>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card3D variant="default" hover={false}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

            {/* Success/Error Alert */}
            {(formStatus === 'success' || formStatus === 'error') && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-2xl border-2 ${
                  formStatus === 'success'
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  {formStatus === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  )}
                  <p
                    className={`text-sm ${
                      formStatus === 'success' ? 'text-green-800' : 'text-red-800'
                    }`}
                  >
                    {submitMessage}
                  </p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">
                  Your Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register('name')}
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    disabled={isLoading}
                    aria-invalid={!!errors.name}
                    className={`${inputClassName(!!errors.name)} pl-12`}
                  />
                </div>
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register('email')}
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    disabled={isLoading}
                    aria-invalid={!!errors.email}
                    className={`${inputClassName(!!errors.email)} pl-12`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-gray-700 mb-2 font-medium">
                  How can we help?
                </label>
                <div className="relative">
                  <HelpCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    {...register('subject')}
                    id="subject"
                    disabled={isLoading}
                    aria-invalid={!!errors.subject}
                    className={`${inputClassName(!!errors.subject)} pl-12 appearance-none cursor-pointer`}
                  >
                    {SUBJECT_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.subject && (
                  <p className="mt-2 text-sm text-red-600">{errors.subject.message}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">
                  Your Message
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={5}
                  placeholder="Tell us what you need help with..."
                  disabled={isLoading}
                  aria-invalid={!!errors.message}
                  className={`${inputClassName(!!errors.message)} resize-none`}
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button3D
                type="submit"
                variant="primary"
                size="lg"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    Send Message
                  </span>
                )}
              </Button3D>
            </form>
          </Card3D>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card3D variant="default" hover={false}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              {faqsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                </div>
              ) : (
                faqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-violet-50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                ))
              )}
            </div>
          </Card3D>
        </motion.div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card3D variant="gradient" hover={false}>
            <div className="text-center">
              <Heart className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">We Love Hearing From You!</h3>
              <p className="text-white/90">
                Your feedback helps us make ClayMind better for everyone.
              </p>
            </div>
          </Card3D>
        </motion.div>
      </div>
    </div>
  );
}
