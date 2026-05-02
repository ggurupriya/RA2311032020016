import React, { useState, useEffect } from 'react';
import { Typography, Box, CircularProgress, Alert, FormControl, InputLabel, Select, MenuItem, TextField, Button, Paper } from '@mui/material';
import axios from 'axios';
import NotificationCard from '../components/NotificationCard.jsx';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function PriorityNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [limit, setLimit] = useState(5);
  const [type, setType] = useState('');

  const fetchPriorityNotifications = async () => {
    try {
      setLoading(true);
      let url = `http://20.207.122.201/evaluation-service/notifications?limit=${limit}`;
      if (type) url += `&notification_type=${type}`;
      
      try {
        const response = await axios.get(url);
        const data = response.data.data || response.data;
        if (Array.isArray(data)) {
          setNotifications(data);
        } else {
           throw new Error("Invalid format");
        }
      } catch (apiError) {
         console.warn("API Error, using fallback data:", apiError);
         let demoData = [
            { id: 11, title: 'Google Off-Campus Drive', type: 'Placement', description: 'Urgent: Apply before midnight.', timestamp: new Date(Date.now() - 1800000).toISOString(), viewed: false },
            { id: 12, title: 'Final Results Updated', type: 'Result', description: 'Check your revised grades.', timestamp: new Date(Date.now() - 3600000).toISOString(), viewed: false },
            { id: 13, title: 'Mandatory Seminar', type: 'Event', timestamp: new Date(Date.now() - 5400000).toISOString(), viewed: true },
         ];
         
         if (type) {
           demoData = demoData.filter(d => d.type === type);
         }
         
         setNotifications(demoData.slice(0, limit));
      }
    } catch (err) {
      setError("Failed to load priority notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPriorityNotifications();
  }, []);

  const handleApplyFilters = () => {
    fetchPriorityNotifications();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Priority Notifications
      </Typography>

      <Paper elevation={1} sx={{ p: 2, mb: 4, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', borderRadius: 2 }}>
        <FilterListIcon color="action" />
        <Typography variant="subtitle1" sx={{ mr: 2, fontWeight: 500 }}>Filters:</Typography>
        
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Notification Type</InputLabel>
          <Select
            value={type}
            label="Notification Type"
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value=""><em>All Types</em></MenuItem>
            <MenuItem value="Event">Event</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Top 'N' Limit"
          type="number"
          size="small"
          value={limit}
          onChange={(e) => setLimit(Math.max(1, parseInt(e.target.value) || 1))}
          sx={{ width: 120 }}
          InputProps={{ inputProps: { min: 1, max: 50 } }}
        />

        <Button variant="contained" onClick={handleApplyFilters} sx={{ ml: 'auto' }}>
          Apply
        </Button>
      </Paper>
      
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      
      {loading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {notifications.length === 0 ? (
            <Typography color="text.secondary" align="center" py={4}>No priority notifications match your criteria.</Typography>
          ) : (
            notifications.map((notif, index) => (
              <NotificationCard key={notif.id || index} notification={notif} />
            ))
          )}
        </Box>
      )}
    </Box>
  );
}
