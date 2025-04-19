import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import IntroSlide from './components/slides/IntroSlide';
import StatsSlide from './components/slides/StatsSlide';
import TopItemsSlide from './components/slides/TopItemsSlide';
import FinalSlide from './components/slides/FinalSlide';
import HeatmapSlide from './components/slides/HeatmapSlide';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF69B4', // Light pink
      light: '#FFB6C1', // Lighter pink
      dark: '#FF1493', // Darker pink
    },
    background: {
      default: '#FFF5F7', // Very light pink background
      paper: '#FFFFFF', // White for cards
    },
    text: {
      primary: '#2C3E50', // Dark text for contrast
      secondary: '#FF69B4', // Pink for accents
    },
  },
  typography: {
    fontFamily: '"Gotham", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<IntroSlide />} />
            <Route path="/stats" element={<StatsSlide />} />
            <Route path="/top-items" element={<TopItemsSlide />} />
            <Route path="/heatmap" element={<HeatmapSlide />} />
            <Route path="/final" element={<FinalSlide />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </ThemeProvider>
  );
}

export default App;
