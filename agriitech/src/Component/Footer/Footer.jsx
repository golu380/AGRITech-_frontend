import * as React from 'react';
import { Box, Grid, Link, Typography, Container, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import Image from 'react-bootstrap/Image';

// Replace these with your own social media URLs
const socialMediaLinks = {
  facebook: '#',
  twitter: '#',
  instagram: '#',
};

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: 'rgb(0, 0, 0);',
        color: 'text.secondary',
        py: 3,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth={false} >
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="white" gutterBottom>
              Brand Name
            </Typography>
            {/* Add your logo component or image here */}
            <Image width="80px" src="/Logo.png" />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="white" gutterBottom>
              PRODUCT
            </Typography>
            <Link to="#" color="#fff" underline="none" display="block">Features</Link>
            <Link to="#" color="#fff" underline="none" display="block">Integrations</Link>
            <Link to="#" color="#fff" underline="none" display="block">Pricing</Link>
            <Link to="#" color="#fff" underline="none" display="block">FAQ</Link>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="white" gutterBottom>
              COMPANY
            </Typography>
            <Link href="#" color="#fff" underline="none" display="block">About Us</Link>
            <Link href="#" color="#fff" underline="none" display="block">Careers</Link>
            <Link href="#" color="#fff" underline="none" display="block">Privacy Policy</Link>
            <Link href="#" color="#fff" underline="none" display="block">Terms of Service</Link>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="white" gutterBottom>
              DEVELOPERS
            </Typography>
            <Link href="#" color="#fff" underline="none" display="block">Public API</Link>
            <Link href="#" color="#fff" underline="none" display="block">Documentation</Link>
            <Link href="#" color="#fff" underline="none" display="block">Guides</Link>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="white" gutterBottom>
              SOCIAL MEDIA
            </Typography>
            <IconButton aria-label="Facebook" color="#fff" component="a" href={socialMediaLinks.facebook}>
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="Twitter" color="#fff" component="a" href={socialMediaLinks.twitter}>
              <TwitterIcon />
            </IconButton>
            <IconButton aria-label="Instagram" color="#fff" component="a" href={socialMediaLinks.instagram}>
              <InstagramIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="body2" color="white" align="center" sx={{ pt: 4 }}>
          © 2024 Company Co. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;