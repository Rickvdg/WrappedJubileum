import { Box, Typography } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import BaseSlide from '../common/BaseSlide';

const MonthsContainer = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '2rem',
  width: '100%',
  maxWidth: '1400px',
  margin: '2rem auto',
  padding: '1rem',
});

const MonthContainer = styled(Box)({
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 105, 180, 0.2)',
  padding: '1.5rem',
});

const MonthTitle = styled(Typography)({
  fontSize: '1.2rem',
  color: '#2C3E50',
  textAlign: 'center',
  marginBottom: '1rem',
  fontWeight: 'bold',
});

const DaysGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '4px',
  '& > div:first-child': {
    gridColumn: '1',
  },
});

const WeekDayLabel = styled(Typography)({
  fontSize: '0.8rem',
  color: '#2C3E50',
  textAlign: 'center',
  marginBottom: '0.5rem',
  fontWeight: 'bold',
});

const DayCell = styled(motion.div)<{ intensity: number }>(({ intensity }) => ({
  width: '100%',
  aspectRatio: '1',
  borderRadius: '4px',
  backgroundColor: `rgba(255, 105, 180, ${0.1 + intensity * 0.9})`,
  cursor: 'pointer',
  position: 'relative',
  minHeight: '24px',
  '&:hover': {
    transform: 'scale(1.2)',
    zIndex: 1,
  },
  '&::after': {
    content: 'attr(data-count)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '0.7rem',
    color: '#2C3E50',
    opacity: intensity > 0.5 ? 1 : 0,
    transition: 'opacity 0.2s ease',
  },
}));

const ScrollableContent = styled(Box)({
  height: 'calc(100vh - 200px)', // Leave space for title and continue text
  overflowY: 'auto',
  paddingRight: '1rem',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 105, 180, 0.1)',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 105, 180, 0.3)',
    borderRadius: '4px',
    '&:hover': {
      background: 'rgba(255, 105, 180, 0.5)',
    },
  },
});

const weekDays = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
const months = [
  'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
  'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'
];

const getFirstDayOfMonth = (month: number) => {
  // Get the first day of the month (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const firstDay = new Date(2024, month, 1).getDay();
  // Convert to Monday-based index (0 = Monday, 1 = Tuesday, ..., 6 = Sunday)
  return firstDay === 0 ? 6 : firstDay - 1;
};

const daysInMonth = (month: number) => {
  // 2024 is a leap year
  const days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return days[month];
};

const HeatmapSlide = () => {
  const navigate = useNavigate();
  const controls = useAnimation();

  // Generate data for all months
  const generateHeatmapData = () => {
    return months.map((_, monthIndex) => {
      const days = daysInMonth(monthIndex);
      return Array.from({ length: days }, () => Math.random());
    });
  };

  const heatmapData = generateHeatmapData();

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

  const cellVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.01,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }),
    hover: {
      scale: 1.2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <BaseSlide onClick={() => navigate('/final')} heartCount={25}>
      <motion.div
        variants={titleVariants}
        initial="initial"
        animate="animate"
      >
        <Typography variant="h3" sx={{ mb: 4, color: '#FF69B4', fontWeight: 'bold' }}>
          Jaarlijkse Activiteit
        </Typography>
        <Typography variant="h6" sx={{ mb: 2, opacity: 0.8 }}>
          Op welke dagen stuurden we de meeste berichten?
        </Typography>
      </motion.div>

      <ScrollableContent>
        <MonthsContainer>
          {months.map((month, monthIndex) => {
            const firstDay = getFirstDayOfMonth(monthIndex);
            return (
              <MonthContainer key={month}>
                <MonthTitle>{month}</MonthTitle>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', mb: 1 }}>
                  {weekDays.map((day) => (
                    <WeekDayLabel key={day}>{day}</WeekDayLabel>
                  ))}
                </Box>
                <DaysGrid>
                  {/* Add empty cells for days before the first day of the month */}
                  {Array.from({ length: firstDay }).map((_, index) => (
                    <Box key={`empty-${index}`} />
                  ))}
                  {/* Add the actual days of the month */}
                  {heatmapData[monthIndex].map((intensity, day) => (
                    <DayCell
                      key={day}
                      intensity={intensity}
                      custom={monthIndex * 31 + day}
                      variants={cellVariants}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
                      data-count={Math.floor(intensity * 100)}
                    />
                  ))}
                </DaysGrid>
              </MonthContainer>
            );
          })}
        </MonthsContainer>
      </ScrollableContent>

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

export default HeatmapSlide; 