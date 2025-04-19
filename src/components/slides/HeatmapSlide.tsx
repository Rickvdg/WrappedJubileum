import { Box, Typography } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import BaseSlide from '../common/BaseSlide';
import userData from '../../data/userData.json';

const MonthsContainer = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
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
  backgroundColor: `rgba(255, 105, 180, ${Math.min(0.1 + intensity * 0.9, 1)})`,
  cursor: 'pointer',
  position: 'relative',
  minHeight: '24px',
  '&:hover': {
    transform: 'scale(1.2)',
    zIndex: 1,
  }
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
  'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober',
  'November', 'December', 'Januari', 'Februari', 'Maart', 'April'
];

const getFirstDayOfMonth = (month: number) => {
  // Get the first day of the month (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const year = month < 8 ? 2024 : 2025; // 2024 for May-Dec, 2025 for Jan-Apr
  const actualMonth = month < 8 ? month + 5 : month - 7; // Convert to actual month number
  const firstDay = new Date(year, actualMonth - 1, 1).getDay(); // Month is 0-based in Date
  // Convert to Monday-based index (0 = Monday, 1 = Tuesday, ..., 6 = Sunday)
  return firstDay === 0 ? 6 : firstDay - 1;
};

const daysInMonth = (month: number) => {
  // 2024 is a leap year, 2025 is not
  const year = month < 8 ? 2024 : 2025;
  const days = [
    31, // May
    30, // June
    31, // July
    31, // August
    30, // September
    31, // October
    30, // November
    31, // December
    31, // January
    year === 2024 ? 29 : 28, // February (leap year check)
    31, // March
    30  // April
  ];
  return days[month];
};

interface MessageActivity {
  [year: string]: {
    [month: string]: number[];
  };
}

const HeatmapSlide = () => {
  const navigate = useNavigate();

  // Get message activity data for both years
  const messageActivity2024 = (userData.messageActivity as MessageActivity)['2024'];
  const messageActivity2025 = (userData.messageActivity as MessageActivity)['2025'];

  // Calculate the maximum number of messages in any day for normalization
  const maxMessages = Math.max(
    ...Object.values(messageActivity2024).flat(),
    ...Object.values(messageActivity2025).flat()
  );

  // Generate normalized heatmap data
  const generateHeatmapData = () => {
    return months.map((_, monthIndex) => {
      const year = monthIndex < 8 ? '2024' : '2025';
      const actualMonth = monthIndex < 8 ? monthIndex + 5 : monthIndex - 7;
      const monthData = year === '2024' 
        ? messageActivity2024[actualMonth.toString()]
        : messageActivity2025[actualMonth.toString()];
      return monthData.slice(0, daysInMonth(monthIndex)).map((count: number) => count / maxMessages);
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
            const monthData = heatmapData[monthIndex];
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
                  {monthData.map((intensity: number, day: number) => (
                    <DayCell
                      key={day}
                      intensity={intensity}
                      custom={monthIndex * 31 + day}
                      variants={cellVariants}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
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