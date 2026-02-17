import React from 'react';
import { Skeleton, Box, Grid } from '@mui/material';

export const JobCardSkeleton = () => (
  <Box sx={{ p: 2 }}>
    <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
    <Box sx={{ pt: 2 }}>
      <Skeleton width="60%" height={30} />
      <Skeleton width="80%" height={20} />
      <Skeleton width="40%" height={20} />
    </Box>
  </Box>
);

export const StatsCardSkeleton = () => (
  <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
);