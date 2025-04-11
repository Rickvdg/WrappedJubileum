import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import userData from '../../data/userData.json';
import BaseSlide from '../common/BaseSlide';

const StatBox = styled(motion.div)({
  marginBottom: '2rem',
  textAlign: 'center',
  padding: '1.5rem',
  borderRadius: '16px',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 105, 180, 0.2)',
  width: '100%',
  maxWidth: '400px',
  position: 'relative',
  overflow: 'hidden',
  zIndex: 1,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, transparent, rgba(255, 105, 180, 0.1), transparent)',
    transform: 'translateX(-100%)',
  }
});

const StatsSlide = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev < userData.stats.tiktoksSent) {
          return prev + Math.ceil(userData.stats.tiktoksSent / 50);
        }
        clearInterval(timer);
        return userData.stats.tiktoksSent;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

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

  const statVariants = {
    initial: { 
      scale: 0.8, 
      opacity: 0,
      y: 50,
      rotate: -5
    },
    animate: (i: number) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }),
    hover: {
      scale: 1.05,
      rotate: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <BaseSlide onClick={() => navigate('/top-items')} heartCount={30}>
      <Typography variant="h3" sx={{ mb: 4, color: '#FF69B4', fontWeight: 'bold' }}>
        TikTok Stats
      </Typography>
      <StatBox
        variants={statVariants}
        custom={0}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        <motion.div
          animate={controls}
        >
          <Typography variant="h2" sx={{ color: '#FF69B4', fontWeight: 'bold' }}>
            {Math.floor(count)}
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.8 }}>
            Tiktok's verstuurd
          </Typography>
        </motion.div>
      </StatBox>

      <StatBox
        variants={statVariants}
        custom={1}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        <motion.div
          animate={controls}
        >
          <Typography variant="h2" sx={{ color: '#FF69B4', fontWeight: 'bold' }}>
            {userData.stats.tiktoksAveragePerDay}
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.8 }}>
            Gemiddeld aantal tiktoks per dag
          </Typography>
        </motion.div>
      </StatBox>

      <StatBox
        variants={statVariants}
        custom={2}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        <motion.div
          animate={controls}
        >
          <Typography variant="h2" sx={{ color: '#FF69B4', fontWeight: 'bold' }}>
            {userData.stats.amountOfMessages}
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.8 }}>
            berichten het afgelopen jaar
          </Typography>
        </motion.div>
      </StatBox>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        <Typography variant="body1" sx={{ marginTop: '2rem', opacity: 0.6 }}>
          Tap to continue
        </Typography>
      </motion.div>
    </BaseSlide>
  );
};

export default StatsSlide; 