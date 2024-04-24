import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Footer = () => {
  return (
    <div style={{ backgroundColor: '#FBE9E7', padding: '20px', textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        &copy; {new Date().getFullYear()} Mamakus recipe. All rights reserved.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        For inquiries, contact us at{' '}
        <Link href="mailto:your-email@example.com" color="inherit">
            muhdagung255@gmail.com
        </Link>
      </Typography>
      <Typography variant="body2" color="text.secondary">
        v1.0
      </Typography>
    </div>
  );
};

export default Footer;
