import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Heart = styled(motion(FavoriteIcon))({
  position: 'absolute',
  color: '#FF69B4',
  opacity: 0.3,
  zIndex: 0,
  fontSize: '2rem',
  transform: 'rotate(180deg)',
});

interface FloatingHeartsProps {
  count?: number;
}

const FloatingHearts = ({ count = 30 }: FloatingHeartsProps) => {
  const hearts = Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: (Math.random() * window.innerWidth) - (window.innerWidth / 2),
    y: (Math.random() * window.innerHeight) - (window.innerHeight / 2),
    scale: Math.random() * 0.8 + 0.7,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 2
  }));

  return (
    <>
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          initial={{ 
            x: heart.x,
            y: heart.y,
            scale: 0,
            rotate: Math.random() * 360
          }}
          animate={{ 
            y: [heart.y, heart.y - 150, heart.y],
            scale: [0, heart.scale, 0],
            rotate: [180, 0, -180],
            opacity: [0, 0.4, 0]
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </>
  );
};

export default FloatingHearts; 