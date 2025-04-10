import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import IntroSlide from './components/slides/IntroSlide';
import StatsSlide from './components/slides/StatsSlide';
import TopItemsSlide from './components/slides/TopItemsSlide';
import FinalSlide from './components/slides/FinalSlide';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1DB954', // Spotify green
    },
    background: {
      default: '#191414', // Spotify black
    },
  },
  typography: {
    fontFamily: '"Gotham", "Helvetica", "Arial", sans-serif',
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
            <Route path="/final" element={<FinalSlide />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </ThemeProvider>
  );
}

export default App;
