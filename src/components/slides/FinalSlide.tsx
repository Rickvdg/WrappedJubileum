import { Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ReplayIcon from '@mui/icons-material/Replay';

const SlideContainer = styled(motion.div)({
  height: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#191414',
  color: '#FFFFFF',
  padding: '2rem',
  textAlign: 'center',
});

const GradientText = styled(Typography)({
  background: 'linear-gradient(45deg, #1DB954, #4CAF50)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  fontWeight: 'bold',
});

const StyledButton = styled(Button)({
  marginTop: '2rem',
  color: '#FFFFFF',
  borderColor: '#1DB954',
  '&:hover': {
    borderColor: '#1ED760',
    backgroundColor: 'rgba(29, 185, 84, 0.1)',
  },
});

const FinalSlide = () => {
  const navigate = useNavigate();

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const textVariants = {
    initial: { y: 50, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.3,
      },
    }),
  };

  return (
    <SlideContainer
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div custom={0} variants={textVariants} initial="initial" animate="animate">
        <GradientText variant="h2" sx={{ mb: 3 }}>
          That's a Wrap!
        </GradientText>
      </motion.div>

      <motion.div custom={1} variants={textVariants} initial="initial" animate="animate">
        <Typography variant="h5" sx={{ mb: 2, opacity: 0.9 }}>
          You've had an amazing year in music
        </Typography>
      </motion.div>

      <motion.div custom={2} variants={textVariants} initial="initial" animate="animate">
        <Typography variant="body1" sx={{ mb: 4, opacity: 0.7 }}>
          From discovering 156 new songs to spending 1,234 minutes with your favorite artists,
          you've created a unique musical journey.
        </Typography>
      </motion.div>

      <motion.div custom={3} variants={textVariants} initial="initial" animate="animate">
        <Typography variant="h6" sx={{ color: '#1DB954', mb: 3 }}>
          Thanks for being part of the music!
        </Typography>
      </motion.div>

      <motion.div custom={4} variants={textVariants} initial="initial" animate="animate">
        <StyledButton
          variant="outlined"
          startIcon={<ReplayIcon />}
          onClick={() => navigate('/')}
        >
          Start Over
        </StyledButton>
      </motion.div>
    </SlideContainer>
  );
};

export default FinalSlide; 