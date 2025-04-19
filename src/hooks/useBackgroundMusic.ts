import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const MUSIC_FILES = {
  '/': '/music/Shop Till You Play.mp3',
  '/stats': '/music/Blondie and the Gamer.mp3',
  '/top-items': '/music/Kinderen van de Camera.mp3',
  '/heatmap': '/music/Ronde knuffellegende.mp3',
  '/message-count': '/music/Dansen onder de zon.mp3',
  '/final': '/music/Kaassoufle Lovin.mp3',
};

export const useBackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
    }

    // Get the music file for the current route
    const musicFile = MUSIC_FILES[location.pathname as keyof typeof MUSIC_FILES];
    
    if (musicFile) {
      // Update the source but don't autoplay
      audioRef.current.src = musicFile;
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [location.pathname]);

  return audioRef;
}; 