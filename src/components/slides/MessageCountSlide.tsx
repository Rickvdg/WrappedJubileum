import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import BaseSlide from '../common/BaseSlide';
import userData from '../../data/userData.json';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const MessageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '2rem',
  marginTop: '2rem',
  flexWrap: 'wrap',
});

const MessageCount = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  padding: '2rem',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 105, 180, 0.2)',
  width: '40%',
  minWidth: '300px',
  position: 'relative',
});

const CountNumber = styled(Typography)({
  fontSize: '3rem',
  fontWeight: 'bold',
  color: '#FF69B4',
});

const CrownIcon = styled(EmojiEventsIcon)({
  position: 'absolute',
  top: '-2rem',
  left: '50%',
  transform: 'translateX(-50%)',
  fontSize: '3.5rem',
  color: '#FFD700',
  filter: 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.3))',
  zIndex: 2,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '120%',
    height: '120%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
    borderRadius: '50%',
    zIndex: -1,
  }
});

const MessageCountSlide = () => {
  const navigate = useNavigate();
  const { userMessages, partnerMessages } = userData.stats;
  const totalMessages = userMessages + partnerMessages;
  const userPercentage = (userMessages / totalMessages) * 100;
  const partnerPercentage = (partnerMessages / totalMessages) * 100;
  const userWon = userMessages > partnerMessages;

  const titleVariants = {
    initial: { y: -50, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.8 } }
  };

  const countVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        delay: 0.5
      }
    }
  };

  return (
    <BaseSlide onClick={() => navigate('/heatmap')} heartCount={25}>
      <motion.div
        variants={titleVariants}
        initial="initial"
        animate="animate"
      >
        <Typography variant="h3" sx={{ mb: 4, color: '#FF69B4', fontWeight: 'bold' }}>
          Wie stuurde meer berichten?
        </Typography>
      </motion.div>

      <MessageContainer>
        <motion.div
          variants={countVariants}
          initial="initial"
          animate="animate"
        >
          <MessageCount>
            {userWon && <CrownIcon />}
            <Typography variant="h5">Jij</Typography>
            <CountNumber>{userMessages.toLocaleString()}</CountNumber>
            <Typography variant="body1" sx={{ opacity: 0.7 }}>
              {userPercentage.toFixed(1)}% van alle berichten
            </Typography>
          </MessageCount>
        </motion.div>

        <motion.div
          variants={countVariants}
          initial="initial"
          animate="animate"
        >
          <MessageCount>
            {!userWon && <CrownIcon />}
            <Typography variant="h5">Partner</Typography>
            <CountNumber>{partnerMessages.toLocaleString()}</CountNumber>
            <Typography variant="body1" sx={{ opacity: 0.7 }}>
              {partnerPercentage.toFixed(1)}% van alle berichten
            </Typography>
          </MessageCount>
        </motion.div>
      </MessageContainer>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <Typography variant="body1" sx={{ marginTop: '2rem', opacity: 0.6 }}>
          Tap to continue
        </Typography>
      </motion.div>
    </BaseSlide>
  );
};

export default MessageCountSlide; 