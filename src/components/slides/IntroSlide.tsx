import { Box, Typography } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import FloatingHearts from '../common/FloatingHearts';

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
  overflow: 'hidden',
  position: 'relative',
});

const Particle = styled(motion.div)({
  position: 'absolute',
  width: '4px',
  height: '4px',
  borderRadius: '50%',
  backgroundColor: '#FF69B4',
  opacity: 0.6,
});

const GradientText = styled(Typography)({
  background: 'linear-gradient(45deg, #FF69B4, #FFB6C1)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  fontSize: '4rem',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '2rem',
  position: 'relative',
  zIndex: 1,
});

const IntroSlide = () => {
  const navigate = useNavigate();
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    });
  }, [controls]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 1,
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

  const textVariants = {
    initial: { 
      y: 100, 
      opacity: 0,
      scale: 0.8,
      rotate: -5
    },
    animate: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.5,
        duration: 1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const subtitleVariants = {
    initial: { 
      y: 50, 
      opacity: 0,
      scale: 0.9,
      rotate: 5
    },
    animate: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: 1.2,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    scale: Math.random() * 0.5 + 0.5,
    duration: Math.random() * 2 + 2
  }));

  return (
    <SlideContainer
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={() => navigate('/stats')}
    >
      <FloatingHearts count={20} />

      <motion.div 
        variants={textVariants}
        animate={controls}
      >
        <GradientText variant="h1">
          Your 2024 Wrapped
        </GradientText>
      </motion.div>
      <motion.div variants={subtitleVariants}>
        <Typography variant="h5" textAlign="center" sx={{ opacity: 0.8 }}>
          Click anywhere to begin your journey
        </Typography>
      </motion.div>
    </SlideContainer>
  );
};

export default IntroSlide; 