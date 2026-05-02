import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Chip, Avatar, IconButton } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WorkIcon from '@mui/icons-material/Work';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const getTypeIcon = (type) => {
  switch (type) {
    case 'Event': return <EventIcon />;
    case 'Result': return <AssessmentIcon />;
    case 'Placement': return <WorkIcon />;
    default: return <EventIcon />;
  }
};

const getTypeColor = (type) => {
  switch (type) {
    case 'Event': return 'primary';
    case 'Result': return 'success';
    case 'Placement': return 'warning';
    default: return 'default';
  }
};

export default function NotificationCard({ notification }) {
  const [viewed, setViewed] = useState(notification.viewed || false);

  const markAsViewed = () => {
    setViewed(true);
  };

  return (
    <Card 
      elevation={viewed ? 1 : 3} 
      sx={{ 
        mb: 2, 
        transition: '0.3s',
        borderLeft: viewed ? '4px solid transparent' : '4px solid #2563eb',
        bgcolor: viewed ? '#ffffff' : '#f0f7ff',
        opacity: viewed ? 0.8 : 1,
        borderRadius: 2
      }}
    >
      <CardContent sx={{ pb: '16px !important' }}>
        <Box display="flex" alignItems="flex-start" gap={2}>
          <Avatar sx={{ bgcolor: `${getTypeColor(notification.type || notification.notification_type)}.main`, opacity: viewed ? 0.6 : 1 }}>
            {getTypeIcon(notification.type || notification.notification_type)}
          </Avatar>
          <Box flex={1}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
              <Typography variant="h6" component="div" sx={{ fontSize: '1.1rem', fontWeight: viewed ? 500 : 700 }}>
                {notification.title || notification.message || "Notification"}
              </Typography>
              <Chip 
                label={notification.type || notification.notification_type || "General"} 
                size="small" 
                color={getTypeColor(notification.type || notification.notification_type)} 
                variant={viewed ? "outlined" : "filled"}
              />
            </Box>
            {notification.description && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {notification.description}
              </Typography>
            )}
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
              <Typography variant="caption" color="text.secondary">
                {notification.timestamp ? new Date(notification.timestamp).toLocaleString() : new Date().toLocaleString()}
              </Typography>
              {!viewed ? (
                <IconButton size="small" color="primary" onClick={markAsViewed} title="Mark as viewed">
                  <CheckCircleOutlineIcon fontSize="small" />
                </IconButton>
              ) : (
                <CheckCircleIcon fontSize="small" color="disabled" title="Viewed" />
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
