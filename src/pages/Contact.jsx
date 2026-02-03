/**
 * Contact Page
 * Dedicated contact page with form and information
 */

import { motion } from 'framer-motion';
import { Contact as ContactSection } from '../components/sections';
import { siteConfig } from '../data/content';
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <div className={styles.contactPage}>
      {/* Page Header */}
      <section className={styles.pageHeader}>
        <div className={styles.headerContainer}>
          <motion.span
            className={styles.pageLabel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contact
          </motion.span>
          <motion.h1
            className={styles.pageTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Let's Work Together
          </motion.h1>
          <motion.p
            className={styles.pageSubtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Map or Additional Info Section */}
      <section className={styles.mapSection}>
        <div className={styles.container}>
          <div className={styles.mapPlaceholder}>
            <div className={styles.mapContent}>
              <h3>Based in {siteConfig.location}</h3>
              <p>Available for remote work worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faq}>
        <div className={styles.container}>
          <motion.h2
            className={styles.faqTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.div
            className={styles.faqGrid}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {[
              {
                question: "What is your typical response time?",
                answer: "I typically respond to inquiries within 24-48 hours during business days."
              },
              {
                question: "Do you work with clients internationally?",
                answer: "Absolutely! I work with clients from all around the world and am comfortable with different time zones."
              },
              {
                question: "What is your project process?",
                answer: "I start with a discovery call to understand your needs, followed by a proposal, design phase, development, testing, and launch."
              },
              {
                question: "Do you offer ongoing maintenance?",
                answer: "Yes, I offer maintenance packages to keep your website or application running smoothly after launch."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className={styles.faqItem}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className={styles.faqQuestion}>{item.question}</h4>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
