import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MenuIcon from '@mui/icons-material/Menu';

const websiteLogo = 'https://firebasestorage.googleapis.com/v0/b/recipe-server-f97e9.appspot.com/o/images%2FLogo.png?alt=media&token=585d27a3-fbfa-40ce-96b9-6339b3d38126'
const backgroundLogo = "https://firebasestorage.googleapis.com/v0/b/recipe-server-f97e9.appspot.com/o/images%2Fheaderbackgroud.jpg?alt=media&token=3d3bb990-7952-44c6-a9ed-3d9ea7b6d9ec";

const ColorButton = styled(Link)(({ theme }) => ({
  color: 'black',
  backgroundColor: 'white',
  // fontFamily:"Kaushan Script, cursive",
  fontSize: 40,
  textDecoration: 'none',
  [theme.breakpoints.down('sm')]: {
    fontSize: 21, // Adjust font size for smaller displays
  },
  '&:hover': {
    backgroundColor: '#FBE9E7',
  },
}));

const Header = () => {
  const [logoSize, setLogoSize] = useState('35%');
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1000) {
        setLogoSize('35%');
      } else {
        setLogoSize('55%');
      }
    };

    // Call handleResize on initial load and on window resize
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleShareWhatsApp = () => {
    const url = window.location.href;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`);
  };

  const handleShareFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#FBE9E7', boxShadow: 'none', borderColor: 'black', backgroundImage: `url(${backgroundLogo})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
      <Toolbar>
        <img src={websiteLogo} alt="Website Logo" style={{ width: logoSize, height: '10%', margin: '0 auto' }} />
      </Toolbar>
      {isSmallScreen ? (
        <Toolbar sx={{ justifyContent: 'right', backgroundColor: 'white', borderColor: 'black'}}>
          <IconButton onClick={handleMenuOpen} variant="text">
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ width: '400px' }}
          >
            <MenuItem>
              <ColorButton to="/" variant="text" >
                Home
              </ColorButton>
            </MenuItem>
            <MenuItem>
              <ColorButton to="/categories" variant="text" >
                Categories
              </ColorButton>
            </MenuItem>
            <MenuItem>
              <ColorButton to="/about" variant="text" >
                About
              </ColorButton>
            </MenuItem>
            <MenuItem>
              <ColorButton variant="text" >
                Share us on:
              </ColorButton>
              <IconButton onClick={handleShareWhatsApp} variant="text" >
                <WhatsAppIcon fontSize={'medium'}/>
              </IconButton>
              <IconButton onClick={handleShareFacebook} variant="text" >
                <FacebookIcon fontSize={'medium'}/>
              </IconButton>
            </MenuItem>
          </Menu>
        </Toolbar>
      ) : (
        <Toolbar sx={{ justifyContent: 'space-between', backgroundColor: 'white', borderColor: 'black'}}>
          <Stack direction="row" spacing={5}>
            <ColorButton to="/" variant="text" >
              Home
            </ColorButton>
            <ColorButton to="/categories" variant="text" >
              Categories
            </ColorButton>
            <ColorButton to="/about" variant="text" >
              About
            </ColorButton>
          </Stack>
          <Stack direction="row" spacing={2}>
            <ColorButton variant="text">
              Share us on:
            </ColorButton>
            <ColorButton onClick={handleShareWhatsApp} variant="text" >
              <WhatsAppIcon fontSize={'large'}/>
            </ColorButton>
            <ColorButton onClick={handleShareFacebook} variant="text" >
              <FacebookIcon fontSize={'large'}/>
            </ColorButton>
          </Stack>
        </Toolbar>
      )}
    </AppBar>
  );
};

export default Header;
