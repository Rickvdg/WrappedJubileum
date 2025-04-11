import { ReactNode, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FloatingHearts from './FloatingHearts';
import { useBackgroundMusic } from '../../hooks/useBackgroundMusic';

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
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(255, 105, 180, 0.1), rgba(255, 182, 193, 0.1))',
    animation: 'gradient 15s ease infinite',
    zIndex: 0,
  },
  '@keyframes gradient': {
    '0%': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0% 50%',
    },
  },
});

const MusicButton = styled(IconButton)({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  zIndex: 10,
});

interface BaseSlideProps {
  children: ReactNode;
  onClick?: () => void;
  heartCount?: number;
}

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

const BaseSlide = ({ children, onClick, heartCount = 20 }: BaseSlideProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useBackgroundMusic();

  const handleMusicToggle = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(error => {
          console.warn('Playback failed:', error);
        });
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <SlideContainer
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={onClick}
    >
      <MusicButton 
        onClick={(e) => {
          e.stopPropagation();
          handleMusicToggle();
        }}
        aria-label={isMuted ? "unmute music" : "mute music"}
      >
        {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </MusicButton>
      <FloatingHearts count={heartCount} />
      {children}
    </SlideContainer>
  );
};

export default BaseSlide; 