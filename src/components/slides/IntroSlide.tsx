import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const SlideContainer = styled(motion.div)({
  height: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#191414',
  color: '#FFFFFF',
  cursor: 'pointer',
  overflow: 'hidden',
});

const GradientText = styled(Typography)({
  background: 'linear-gradient(45deg, #1DB954, #4CAF50)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  fontSize: '4rem',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '2rem',
});

const IntroSlide = () => {
  const navigate = useNavigate();

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const textVariants = {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.5, duration: 0.8 } },
  };

  return (
    <SlideContainer
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={() => navigate('/stats')}
    >
      <motion.div variants={textVariants}>
        <GradientText variant="h1">
          Your 2024 Wrapped
        </GradientText>
        <Typography variant="h5" textAlign="center" sx={{ opacity: 0.8 }}>
          Click anywhere to begin your journey
        </Typography>
      </motion.div>
    </SlideContainer>
  );
};

export default IntroSlide; 