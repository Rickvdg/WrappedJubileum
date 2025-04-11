import { Typography, Button } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ReplayIcon from '@mui/icons-material/Replay';
import { useEffect } from 'react';
import userData from '../../data/userData.json';
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
  padding: '2rem',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
});

const GradientText = styled(Typography)({
  background: 'linear-gradient(45deg, #FF69B4, #FFB6C1)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  fontWeight: 'bold',
  position: 'relative',
  zIndex: 1,
});

const StyledButton = styled(motion(Button))({
  marginTop: '2rem',
  color: '#2C3E50',
  borderColor: '#FF69B4',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, transparent, rgba(255, 105, 180, 0.1), transparent)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.6s ease',
  },
  '&:hover': {
    borderColor: '#FFB6C1',
    backgroundColor: 'rgba(255, 105, 180, 0.1)',
    '&::before': {
      transform: 'translateX(100%)',
    }
  },
});

const FinalSlide = () => {
  const navigate = useNavigate();
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: [1, 1.02, 1],
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

  const textVariants = {
    initial: { 
      y: 50, 
      opacity: 0,
      scale: 0.9,
      rotate: -5
    },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    })
  };

  const buttonVariants = {
    initial: { 
      scale: 0.8, 
      opacity: 0,
      y: 20,
      rotate: -5
    },
    animate: { 
      scale: 1,
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        delay: 1.5,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      rotate: 2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <SlideContainer
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <FloatingHearts count={35} />

      <motion.div 
        custom={0} 
        variants={textVariants} 
        initial="initial" 
        animate="animate"
      >
        <GradientText variant="h2" sx={{ mb: 3 }}>
          That's a Wrap!
        </GradientText>
      </motion.div>

      <motion.div 
        custom={1} 
        variants={textVariants} 
        initial="initial" 
        animate="animate"
      >
        <Typography variant="h5" sx={{ mb: 2, opacity: 0.9 }}>
          You've had an amazing year in love
        </Typography>
      </motion.div>

      <motion.div 
        custom={2} 
        variants={textVariants} 
        initial="initial" 
        animate="animate"
      >
        <Typography variant="body1" sx={{ mb: 4, opacity: 0.7 }}>
          Van het wisselen van {userData.stats.tiktoksSent} verschillende tiktoks en het sturen van {userData.stats.averageMessagesPerDay} berichten per dag naar elkaar,
          hebben we een unieke liefdesreis gemaakt.
        </Typography>
      </motion.div>

      <motion.div 
        custom={3} 
        variants={textVariants} 
        initial="initial" 
        animate="animate"
      >
        <Typography variant="h6" sx={{ color: '#FF69B4', mb: 3 }}>
          Bedankt voor het deelnemen aan de liefdesreis!
        </Typography>
      </motion.div>

      <StyledButton
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        variant="outlined"
        startIcon={<ReplayIcon />}
        onClick={() => navigate('/')}
      >
        Naar het begin
      </StyledButton>
    </SlideContainer>
  );
};

export default FinalSlide; 