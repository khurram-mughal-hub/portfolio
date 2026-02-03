/**
 * About Page
 * Dedicated about page with extended information
 */

import { motion } from 'framer-motion';
import { About as AboutSection } from '../components/sections';
import { SectionTitle, Button, Icon } from '../components/common';
import { aboutContent, siteConfig } from '../data/content';
import { fadeInUp, staggerContainer, viewportSettings } from '../utils/animations';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.aboutPage}>
      {/* Page Header */}
      <section className={styles.pageHeader}>
        <div className={styles.headerContainer}>
          <motion.span
            className={styles.pageLabel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.span>
          <motion.h1
            className={styles.pageTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Hi, I'm {siteConfig.name}
          </motion.h1>
          <motion.p
            className={styles.pageSubtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {siteConfig.title} based in {siteConfig.location}
          </motion.p>
        </div>
      </section>

      {/* Main About Content */}
      <AboutSection />

      {/* My Journey Section */}
      <section className={styles.journey}>
        <div className={styles.container}>
          <SectionTitle
            subtitle="My Journey"
            title="How I Got Here"
          />

          <motion.div
            className={styles.timeline}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            {[
              {
                year: '2019',
                title: 'Started Coding',
                description: 'Began my journey into web development, learning HTML, CSS, and JavaScript fundamentals.'
              },
              {
                year: '2020',
                title: 'First Freelance Project',
                description: 'Completed my first paid project, building a website for a local business.'
              },
              {
                year: '2021',
                title: 'Full Stack Development',
                description: 'Expanded skills to include backend technologies like Node.js and databases.'
              },
              {
                year: '2022',
                title: 'Senior Developer Role',
                description: 'Joined a startup as a senior developer, leading frontend architecture decisions.'
              },
              {
                year: '2023 - Present',
                title: 'Independent Consultant',
                description: 'Working with clients worldwide, helping them build amazing digital products.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className={styles.timelineItem}
                variants={fadeInUp}
              >
                <div className={styles.timelineMarker}>
                  <span className={styles.timelineYear}>{item.year}</span>
                  <div className={styles.timelineDot}></div>
                </div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineTitle}>{item.title}</h3>
                  <p className={styles.timelineDescription}>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <motion.div
            className={styles.ctaContent}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.ctaTitle}>Ready to work together?</h2>
            <p className={styles.ctaDescription}>
              I'm always excited to take on new projects and collaborate with amazing people.
            </p>
            <div className={styles.ctaButtons}>
              <Button to="/contact" variant="primary" size="large">
                Get In Touch
                <Icon name="arrowRight" size={18} />
              </Button>
              <Button href={aboutContent.resumeLink} variant="outline" size="large">
                Download Resume
                <Icon name="download" size={18} />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
