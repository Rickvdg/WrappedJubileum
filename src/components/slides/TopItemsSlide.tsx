import { Box, Typography, Card, CardContent } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';

const SlideContainer = styled(motion.div)({
  minHeight: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#FFF5F7',
  color: '#2C3E50',
  padding: '2rem',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
});

const ItemCard = styled(motion(Card))({
  width: '100%',
  maxWidth: '500px',
  marginBottom: '1rem',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  color: '#2C3E50',
  borderRadius: '16px',
  overflow: 'hidden',
  border: '1px solid rgba(255, 105, 180, 0.2)',
  position: 'relative',
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
  '&:hover::before': {
    transform: 'translateX(100%)',
  }
});

const TopItemsSlide = () => {
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

  const titleVariants = {
    initial: { 
      y: -50, 
      opacity: 0,
      scale: 0.9,
      rotate: -5
    },
    animate: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const cardVariants = {
    initial: { 
      x: -100, 
      opacity: 0,
      scale: 0.9,
      rotate: -5
    },
    animate: (i: number) => ({
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }),
    hover: {
      scale: 1.02,
      y: -5,
      rotate: 2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const topArtists = [
    { name: 'Artist 1', plays: 245 },
    { name: 'Artist 2', plays: 198 },
    { name: 'Artist 3', plays: 156 },
    { name: 'Artist 4', plays: 134 },
    { name: 'Artist 5', plays: 112 },
  ];

  return (
    <SlideContainer
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={() => navigate('/final')}
    >
      <motion.div
        variants={titleVariants}
        initial="initial"
        animate="animate"
      >
        <Typography variant="h3" sx={{ mb: 4, color: '#FF69B4', fontWeight: 'bold' }}>
          Your Top Artists
        </Typography>
      </motion.div>

      {topArtists.map((artist, index) => (
        <ItemCard
          key={artist.name}
          custom={index}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          <CardContent>
            <motion.div
              animate={controls}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">
                  {index + 1}. {artist.name}
                </Typography>
                <Typography variant="body1" sx={{ color: '#FF69B4' }}>
                  {artist.plays} plays
                </Typography>
              </Box>
            </motion.div>
          </CardContent>
        </ItemCard>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <Typography variant="body1" sx={{ marginTop: '2rem', opacity: 0.6 }}>
          Tap to see your final summary
        </Typography>
      </motion.div>
    </SlideContainer>
  );
};

export default TopItemsSlide; 