import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const websiteLogo = 'https://firebasestorage.googleapis.com/v0/b/recipe-server-f97e9.appspot.com/o/images%2FLogo.png?alt=media&token=585d27a3-fbfa-40ce-96b9-6339b3d38126'
const backgroundLogo = "https://firebasestorage.googleapis.com/v0/b/recipe-server-f97e9.appspot.com/o/images%2Fheaderbackgroud.jpg?alt=media&token=3d3bb990-7952-44c6-a9ed-3d9ea7b6d9ec";


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
    <AppBar position="static" sx={{ backgroundColor: '#FBE9E7', boxShadow: 'none', borderColor: 'black', borderWidth: 10, backgroundImage: `url(${backgroundLogo})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
      <Toolbar>
        <img src={websiteLogo} alt="Website Logo" style={{ width: '35%', height: '10%', margin: '0 auto' }} />
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

