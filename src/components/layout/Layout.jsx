/**
 * Layout Component
 * Main layout wrapper with Header and Footer
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { ScrollToTop } from '../common';
import { pageTransition } from '../../utils/animations';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className={styles.layout}>
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className={styles.main}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransition}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Layout;
