// src/components/common/StatsCard.js
import React from 'react';
import { Paper, Typography, Box, Chip, useTheme } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import CountUp from 'react-countup';

const StatsCard = ({ icon: Icon, value, label, color, trend, trendValue, format = 'number' }) => {
  const theme = useTheme();

  const formattedValue = () => {
    if (format === 'currency') {
      return <CountUp start={0} end={value} duration={2} separator="," prefix="$" />;
    }
    if (format === 'percentage') {
      return <CountUp start={0} end={value} duration={2} suffix="%" />;
    }
    return <CountUp start={0} end={value} duration={2} separator="," />;
  };

  return (
    <Paper
      sx={{
        p: 3,
        height: '100%',
        background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
        border: `1px solid ${color}30`,
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
        },
      }}
    >
      {/* Background Icon */}
      <Box sx={{ position: 'absolute', top: -20, right: -20, opacity: 0.1, fontSize: 80 }}>
        <Icon sx={{ fontSize: 80, color }} />
      </Box>

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              {React.cloneElement(<Icon />, { sx: { fontSize: 32, color } })}
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
              {formattedValue()}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              {label}
            </Typography>
          </Box>

          {trend && (
            <Chip
              icon={trendValue > 0 ? <TrendingUp /> : <TrendingDown />}
              label={`${trendValue > 0 ? '+' : ''}${trendValue}%`}
              size="small"
              sx={{
                background: trendValue > 0 ? '#10b98120' : '#ef444420',
                color: trendValue > 0 ? '#10b981' : '#ef4444',
                fontWeight: 600,
              }}
            />
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default StatsCard;