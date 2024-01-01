import React from 'react';
import { BottomNavigation, BottomNavigationAction, Container, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Container>
      <BottomNavigation sx={{ backgroundColor: '#f0f0f0', padding: '1rem', justifyContent: 'center' }}>
        <BottomNavigationAction label="GitHub" icon={<GitHubIcon />} href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" />
        <BottomNavigationAction label="LinkedIn" icon={<LinkedInIcon />} href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" />
      </BottomNavigation>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ marginTop: '1rem' }}>
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </Typography>
    </Container>
  );
};

export default Footer;
