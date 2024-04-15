import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const websiteLogo = 'https://firebasestorage.googleapis.com/v0/b/recipe-server-f97e9.appspot.com/o/images%2FWebsiteLogo.png?alt=media&token=b84e56fc-70dc-4415-9391-7105a3a28e7b'

const ColorButton = styled(Button)(({ theme }) => ({
  color: 'black',
   backgroundColor:'white',
   fontFamily:"'Kalam', cursive",
   fontWeight: 'bold', 
  '&:hover': {
    backgroundColor: '#FBE9E7',
  },
}));


const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#FBE9E7', boxShadow: 'none', borderColor: 'black', borderWidth: 10 }}>
      <Toolbar>
        <img src={websiteLogo} alt="Website Logo" style={{ width: '50%', height: '20%', margin: '0 auto' }} />
      </Toolbar>
      <Toolbar sx={{ justifyContent: 'center', backgroundColor: 'white'}}>
        <Stack direction="row" spacing={5}>
        <ColorButton variant="text" startIcon={<HomeIcon />}>
          Home
        </ColorButton>
        <ColorButton variant="text" startIcon={<HomeIcon /> } fontFamily={"'Kalam', cursive"}>
          About
        </ColorButton>
      </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

