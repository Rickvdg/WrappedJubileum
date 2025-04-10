import { Box, Typography, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const SlideContainer = styled(motion.div)({
  minHeight: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#191414',
  color: '#FFFFFF',
  padding: '2rem',
  cursor: 'pointer',
});

const ItemCard = styled(motion(Card))({
  width: '100%',
  maxWidth: '500px',
  marginBottom: '1rem',
  backgroundColor: 'rgba(29, 185, 84, 0.1)',
  backdropFilter: 'blur(10px)',
  color: '#FFFFFF',
  borderRadius: '8px',
  overflow: 'hidden',
});

const TopItemsSlide = () => {
  const navigate = useNavigate();

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const cardVariants = {
    initial: { x: -100, opacity: 0 },
    animate: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2,
      },
    }),
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
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Typography variant="h3" sx={{ mb: 4, color: '#1DB954', fontWeight: 'bold' }}>
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
        >
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">
                {index + 1}. {artist.name}
              </Typography>
              <Typography variant="body1" sx={{ color: '#1DB954' }}>
                {artist.plays} plays
              </Typography>
            </Box>
          </CardContent>
        </ItemCard>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <Typography variant="body1" sx={{ marginTop: '2rem', opacity: 0.6 }}>
          Tap to see your final summary
        </Typography>
      </motion.div>
    </SlideContainer>
  );
};

export default TopItemsSlide; 