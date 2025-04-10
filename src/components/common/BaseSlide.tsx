import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import FloatingHearts from './FloatingHearts';

const SlideContainer = styled(motion.div)({
  height: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFF5F7',
  color: '#2C3E50',
  cursor: 'pointer',
  padding: '2rem',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(255, 105, 180, 0.1), rgba(255, 182, 193, 0.1))',
    animation: 'gradient 15s ease infinite',
    zIndex: 0,
  },
  '@keyframes gradient': {
    '0%': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0% 50%',
    },
  },
});

interface BaseSlideProps {
  children: ReactNode;
  onClick?: () => void;
  heartCount?: number;
}

const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeIn"
    }
  }
};

const BaseSlide = ({ children, onClick, heartCount = 30 }: BaseSlideProps) => {
  return (
    <SlideContainer
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={onClick}
    >
      <FloatingHearts count={heartCount} />
      {children}
    </SlideContainer>
  );
};

export default BaseSlide; 