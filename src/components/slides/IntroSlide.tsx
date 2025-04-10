import { Typography } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import BaseSlide from '../common/BaseSlide';

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

  return (
    <BaseSlide onClick={() => navigate('/stats')} heartCount={20}>
      <motion.div 
        variants={textVariants}
        animate={controls}
      >
        <GradientText variant="h1">
          Your 4th Anniversary Wrapped
        </GradientText>
      </motion.div>
      <motion.div variants={subtitleVariants}>
        <Typography variant="h5" textAlign="center" sx={{ opacity: 0.8 }}>
          Click anywhere to begin your journey
        </Typography>
      </motion.div>
    </BaseSlide>
  );
};

export default IntroSlide; 