import React, { useState, useEffect } from 'react';
import Spinner from '../Components/FyingPan';
import Typography from '@mui/material/Typography';


const Aboutpage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    setTimeout(() => setLoading(false), 1000);
  })

  if (loading) {
    return <Spinner/>;
  }

  return (
    <div style={{background: 'linear-gradient(to bottom, #ffecd2, #fcb69f)', minHeight:'5vh'}}>
      <div style={{ textAlign: 'center', padding: '20%' }}>
      <Typography variant="h4" gutterBottom fontFamily={"Kaushan Script, cursive"}>
        About Us
      </Typography>
      <Typography variant="h6">
        This website is created for sharing my personal recipes that have been tested and adjusted to taste based on Southeast Asian cuisine, particularly Indonesian. It was created with love and based on years of cooking experience as a mother and veteran chef.
      </Typography>
    </div>
    </div>
  );
};

export default Aboutpage;
