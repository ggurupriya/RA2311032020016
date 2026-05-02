import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

import AllNotifications from './pages/AllNotifications.jsx';
import PriorityNotifications from './pages/PriorityNotifications.jsx';

function App() {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky" elevation={2}>
        <Toolbar>
          <NotificationsIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Notifications System
          </Typography>
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
            sx={{ 
              mr: 2, 
              opacity: location.pathname === '/' ? 1 : 0.7,
              borderBottom: location.pathname === '/' ? '3px solid white' : '3px solid transparent',
              borderRadius: 0,
              pb: 1, pt: 1
            }}
          >
            All
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/priority"
            sx={{ 
              opacity: location.pathname === '/priority' ? 1 : 0.7,
              borderBottom: location.pathname === '/priority' ? '3px solid white' : '3px solid transparent',
              borderRadius: 0,
              pb: 1, pt: 1
            }}
          >
            Priority
          </Button>
        </Toolbar>
      </AppBar>
      
      <Container component="main" sx={{ flex: 1, py: 4, maxWidth: '800px !important' }}>
        <Routes>
          <Route path="/" element={<AllNotifications />} />
          <Route path="/priority" element={<PriorityNotifications />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
