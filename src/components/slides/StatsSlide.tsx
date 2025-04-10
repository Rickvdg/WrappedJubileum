import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
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
  padding: '2rem',
});

const StatBox = styled(motion.div)({
  marginBottom: '2rem',
  textAlign: 'center',
});

const StatsSlide = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev < 1234) {
          return prev + 17;
        }
        clearInterval(timer);
        return 1234;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const statVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  };

  return (
    <SlideContainer
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={() => navigate('/top-items')}
    >
      <StatBox
        variants={statVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.5 }}
      >
        <Typography variant="h2" sx={{ color: '#1DB954', fontWeight: 'bold' }}>
          {Math.floor(count)}
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.8 }}>
          Minutes Listened
        </Typography>
      </StatBox>

      <StatBox
        variants={statVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 1.0 }}
      >
        <Typography variant="h2" sx={{ color: '#1DB954', fontWeight: 'bold' }}>
          42
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.8 }}>
          Different Artists
        </Typography>
      </StatBox>

      <StatBox
        variants={statVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 1.5 }}
      >
        <Typography variant="h2" sx={{ color: '#1DB954', fontWeight: 'bold' }}>
          156
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.8 }}>
          New Songs Discovered
        </Typography>
      </StatBox>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <Typography variant="body1" sx={{ marginTop: '2rem', opacity: 0.6 }}>
          Tap to continue
        </Typography>
      </motion.div>
    </SlideContainer>
  );
};

export default StatsSlide; 