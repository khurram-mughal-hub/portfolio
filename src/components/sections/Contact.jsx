/**
 * Contact Section Component
 * Premium animated contact form with floating labels
 */

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { contactContent, socialLinks } from '../../data/content';
import { isValidEmail } from '../../utils/helpers';
import styles from './Contact.module.css';

// Animated Input Component with Floating Label
const AnimatedInput = ({ 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder, 
  error,
  isTextarea = false,
  rows = 6
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const hasValue = value && value.length > 0;
  
  const Component = isTextarea ? 'textarea' : 'input';
  
  return (
    <div className={styles.inputWrapper}>
      <motion.label
        className={`${styles.floatingLabel} ${(isFocused || hasValue) ? styles.floatingLabelActive : ''}`}
        initial={false}
        animate={{
          y: (isFocused || hasValue) ? -28 : 0,
          scale: (isFocused || hasValue) ? 0.85 : 1,
          color: isFocused 
            ? 'var(--primary-color)' 
            : hasValue 
              ? 'var(--text-secondary)' 
              : 'var(--text-muted)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {placeholder}
      </motion.label>
      
      <Component
        ref={inputRef}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`${styles.input} ${isTextarea ? styles.textarea : ''} ${error ? styles.inputError : ''} ${isFocused ? styles.inputFocused : ''}`}
        rows={isTextarea ? rows : undefined}
        aria-label={placeholder}
      />
      
      {/* Focus Line */}
      <motion.div 
        className={styles.focusLine}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.span
            className={styles.error}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

// Magnetic Social Icon Component
const MagneticSocialIcon = ({ href, icon, label }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 300, damping: 20 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    
    x.set(distX * 0.3);
    y.set(distY * 0.3);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  const iconPaths = {
    github: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
    linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    twitter: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    dribbble: "M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z",
    email: "M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z",
  };
  
  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.socialLink}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
        <path d={iconPaths[icon] || iconPaths.email} />
      </svg>
    </motion.a>
  );
};

// Success Animation Component
const SuccessAnimation = () => (
  <motion.div
    className={styles.successAnimation}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  >
    <motion.div className={styles.successCircle}>
      <motion.svg
        viewBox="0 0 52 52"
        className={styles.successCheck}
        initial="hidden"
        animate="visible"
      >
        <motion.circle
          className={styles.successCircleBg}
          cx="26"
          cy="26"
          r="25"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <motion.path
          className={styles.successCheckmark}
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
        />
      </motion.svg>
    </motion.div>
    <motion.h4
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      Message Sent Successfully!
    </motion.h4>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      I&apos;ll get back to you as soon as possible.
    </motion.p>
  </motion.div>
);

// Contact Info Card Component
const ContactInfoCard = ({ icon, label, value, link, delay }) => {
  const iconPaths = {
    email: "M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z",
    phone: "M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z",
    location: "M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z",
  };
  
  const content = (
    <>
      <div className={styles.infoIcon}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d={iconPaths[icon] || iconPaths.email} />
        </svg>
      </div>
      <div className={styles.infoContent}>
        <span className={styles.infoLabel}>{label}</span>
        <span className={styles.infoValue}>{value}</span>
      </div>
    </>
  );
  
  return (
    <motion.div
      className={styles.infoCard}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ x: 5 }}
    >
      {link ? (
        <a href={link} className={styles.infoCardLink}>
          {content}
        </a>
      ) : (
        content
      )}
    </motion.div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Tilt effect for form card
  const formRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 30 });
  
  const handleFormMouseMove = (e) => {
    if (!formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);
    
    rotateX.set(-percentY * 3);
    rotateY.set(percentX * 3);
  };
  
  const handleFormMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors from the server
        if (data.errors) {
          setErrors(data.errors);
        }
        throw new Error(data.message || 'Failed to send message');
      }

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Contact form error:', error);
      setErrors({ 
        submit: error.message || 'Failed to send message. Please try again later.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      {/* Background */}
      <div className={styles.backgroundDecor}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gridPattern} />
      </div>
      
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className={styles.badgeIcon}>✉️</span>
            Get in Touch
          </motion.span>
          <h2 className={styles.title}>
            Let&apos;s <span className={styles.titleHighlight}>Connect</span>
          </h2>
          <p className={styles.subtitle}>
            Have a project in mind or just want to say hello? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className={styles.content}>
          {/* Contact Info */}
          <motion.div
            className={styles.infoWrapper}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className={styles.infoHeadline}>
              Let&apos;s create something <span className={styles.headlineHighlight}>amazing</span> together
            </h3>
            <p className={styles.infoDescription}>
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            {/* Contact Details */}
            <div className={styles.contactDetails}>
              {contactContent.contactInfo.map((info, index) => (
                <ContactInfoCard
                  key={index}
                  icon={info.icon}
                  label={info.label}
                  value={info.value}
                  link={info.link}
                  delay={index * 0.1}
                />
              ))}
            </div>

            {/* Social Links */}
            <div className={styles.socialWrapper}>
              <h4 className={styles.socialTitle}>Connect with me</h4>
              <div className={styles.socialLinks}>
                {socialLinks.map((social) => (
                  <MagneticSocialIcon
                    key={social.name}
                    href={social.url}
                    icon={social.icon}
                    label={social.name}
                  />
                ))}
              </div>
            </div>
            
            {/* Decorative Card */}
            <motion.div
              className={styles.decorativeCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <span className={styles.decorativeEmoji}>🚀</span>
              <p>Currently available for freelance work</p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            ref={formRef}
            className={styles.formWrapper}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              rotateX: springRotateX,
              rotateY: springRotateY,
              transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleFormMouseMove}
            onMouseLeave={handleFormMouseLeave}
          >
            <div className={styles.formGlow} />
            
            <AnimatePresence mode="wait">
              {submitSuccess ? (
                <SuccessAnimation key="success" />
              ) : (
                <motion.form 
                  key="form"
                  className={styles.form} 
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className={styles.formRow}>
                    <AnimatedInput
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      error={errors.name}
                    />
                    <AnimatedInput
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      error={errors.email}
                    />
                  </div>

                  <AnimatedInput
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    error={errors.subject}
                  />

                  <AnimatedInput
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    error={errors.message}
                    isTextarea
                    rows={5}
                  />

                  <motion.button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className={styles.buttonContent}>
                      {isSubmitting ? (
                        <>
                          <span className={styles.spinner} />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.buttonIcon}>
                            <path d="M22 2L11 13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M22 2L15 22L11 13L2 9L22 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </>
                      )}
                    </span>
                    <span className={styles.buttonShine} />
                  </motion.button>

                  {/* Submit Error Message */}
                  <AnimatePresence>
                    {errors.submit && (
                      <motion.div
                        className={styles.submitError}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className={styles.errorIcon}>
                          <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z"/>
                        </svg>
                        {errors.submit}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
