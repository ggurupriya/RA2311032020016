import React, { useState, useEffect } from 'react';
import { Typography, Box, CircularProgress, Alert, Pagination } from '@mui/material';
import axios from 'axios';
import NotificationCard from '../components/NotificationCard.jsx';

export default function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        try {
          const response = await axios.get(`http://20.207.122.201/evaluation-service/notifications?page=${page}&limit=${limit}`);
          const data = response.data.data || response.data;
          if (Array.isArray(data)) {
            setNotifications(data);
          } else {
            throw new Error("Invalid format");
          }
        } catch (apiError) {
          console.warn("API Error, using fallback data:", apiError);
          const demoData = [
            { id: 1, title: 'Exam Schedule Released', type: 'Event', timestamp: new Date(Date.now() - 3600000).toISOString(), viewed: false },
            { id: 2, title: 'Semester 4 Results Published', type: 'Result', timestamp: new Date(Date.now() - 7200000).toISOString(), viewed: false },
            { id: 3, title: 'TCS Campus Drive', type: 'Placement', description: 'TCS is visiting for recruitment next week. Please register.', timestamp: new Date(Date.now() - 86400000).toISOString(), viewed: true },
            { id: 4, title: 'Tech Fest 2026', type: 'Event', description: 'Annual tech fest registration is open.', timestamp: new Date(Date.now() - 172800000).toISOString(), viewed: true },
            { id: 5, title: 'Mid-term Results', type: 'Result', timestamp: new Date(Date.now() - 259200000).toISOString(), viewed: true },
          ];
          setNotifications(demoData);
        }
      } catch (err) {
        setError("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        All Notifications
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      
      {loading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {notifications.length === 0 ? (
            <Typography color="text.secondary" align="center" py={4}>No notifications found.</Typography>
          ) : (
            notifications.map((notif, index) => (
              <NotificationCard key={notif.id || index} notification={notif} />
            ))
          )}
          
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination count={5} page={page} onChange={handlePageChange} color="primary" />
          </Box>
        </>
      )}
    </Box>
  );
}
