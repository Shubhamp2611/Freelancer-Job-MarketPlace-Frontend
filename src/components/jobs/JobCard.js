// src/components/jobs/JobCard.js
import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Avatar,
  Stack,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  Work,
  AttachMoney,
  AccessTime,
  Person,
  LocationOn,
  Bookmark,
  BookmarkBorder,
  Schedule,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const JobCard = ({ job, onSave, isSaved, showActions = true }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isClient = user.role === 'CLIENT';
  const isFreelancer = user.role === 'FREELANCER';

  const getStatusColor = (status) => {
    const colors = {
      OPEN: { bg: '#e8f5e9', color: '#2e7d32', label: 'Open' },
      IN_PROGRESS: { bg: '#fff3e0', color: '#f57c00', label: 'In Progress' },
      COMPLETED: { bg: '#e3f2fd', color: '#1565c0', label: 'Completed' },
      CANCELLED: { bg: '#ffebee', color: '#c62828', label: 'Cancelled' },
    };
    return colors[status] || colors.OPEN;
  };

  const getTypeColor = (type) => {
    const colors = {
      FIXED_PRICE: { bg: '#e8f5e9', color: '#2e7d32' },
      HOURLY: { bg: '#e3f2fd', color: '#1565c0' },
      PART_TIME: { bg: '#fff3e0', color: '#f57c00' },
      FULL_TIME: { bg: '#f3e5f5', color: '#7b1fa2' },
    };
    return colors[type] || { bg: '#f5f5f5', color: '#616161' };
  };

  const statusStyle = getStatusColor(job.status);
  const typeStyle = getTypeColor(job.type);

  const timeAgo = job.createdAt 
    ? formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })
    : 'Recently';

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
        },
      }}
      onClick={() => window.location.href = `/jobs/${job.id}`}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, pr: 4 }} noWrap>
              {job.title}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <Chip
                label={job.status}
                size="small"
                sx={{
                  bgcolor: statusStyle.bg,
                  color: statusStyle.color,
                  fontWeight: 600,
                }}
              />
              <Chip
                label={job.type?.replace('_', ' ')}
                size="small"
                sx={{
                  bgcolor: typeStyle.bg,
                  color: typeStyle.color,
                  fontWeight: 600,
                }}
              />
            </Stack>
          </Box>
          
          {/* Save Button */}
          {showActions && isFreelancer && job.status === 'OPEN' && (
            <Tooltip title={isSaved ? 'Remove from saved' : 'Save job'}>
              <Button
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onSave?.(job.id);
                }}
                sx={{ minWidth: 'auto', p: 1 }}
              >
                {isSaved ? <Bookmark color="primary" /> : <BookmarkBorder />}
              </Button>
            </Tooltip>
          )}
        </Box>

        {/* Budget */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <AttachMoney sx={{ color: 'primary.main', fontSize: 20 }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
            ${job.budget?.toLocaleString()}
          </Typography>
          {job.type === 'HOURLY' && (
            <Typography variant="body2" color="text.secondary">
              /hr
            </Typography>
          )}
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.6,
          }}
        >
          {job.description}
        </Typography>

        {/* Skills */}
        {job.skillsRequired && (
          <Box sx={{ mb: 2 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {job.skillsRequired.split(',').slice(0, 4).map((skill, idx) => (
                <Chip
                  key={idx}
                  label={skill.trim()}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    mb: 0.5,
                  }}
                />
              ))}
              {job.skillsRequired.split(',').length > 4 && (
                <Chip
                  label={`+${job.skillsRequired.split(',').length - 4}`}
                  size="small"
                  variant="outlined"
                  sx={{ borderRadius: 1, fontSize: '0.75rem', mb: 0.5 }}
                />
              )}
            </Stack>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Footer Info */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.light', fontSize: '0.75rem' }}>
              {job.clientName?.charAt(0) || 'C'}
            </Avatar>
            <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 120 }}>
              {job.clientName || 'Client'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Tooltip title="Estimated duration">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  {job.estimatedDuration || 'N/A'}d
                </Typography>
              </Box>
            </Tooltip>

            <Tooltip title="Posted date">
              <Typography variant="caption" color="text.secondary">
                {timeAgo}
              </Typography>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>

      {showActions && (
        <CardActions sx={{ p: 3, pt: 0 }}>
          <Button
            fullWidth
            variant="outlined"
            component={Link}
            to={`/jobs/${job.id}`}
            sx={{
              borderRadius: 2,
              borderColor: 'divider',
              color: 'text.primary',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'transparent',
              },
            }}
          >
            View Details
          </Button>
          
          {isFreelancer && job.status === 'OPEN' && (
            <Button
              fullWidth
              variant="contained"
              component={Link}
              to={`/jobs/${job.id}/propose`}
              sx={{
                borderRadius: 2,
                background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
              }}
            >
              Apply Now
            </Button>
          )}
          
          {isClient && job.clientId === user.id && job.status === 'OPEN' && (
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              component={Link}
              to={`/jobs/${job.id}/edit`}
            >
              Edit
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default JobCard;