
import React, { useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Adsense = () => {
  useEffect(() => {
    if (window) {
      const script = document.createElement("script");
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8683472106710311";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);

      script.onload = () => {
        if (window.adsbygoogle && process.env.NODE_ENV !== "development") {
          window.adsbygoogle.push({});
        }
      };
    }
  }, []);

  return (
    <Card sx={{ height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 3 }}>
    <CardContent>
    <ins
      className="adsbygoogle"
      style={{ display: 'inline-block', width: '400px', height: '400px' }}
      data-ad-client="ca-pub-8683472106710311"
      data-ad-slot="6779483922"
      data-full-width-responsive="true"
    ></ins>
          </CardContent>
    </Card>
  );
};

export default Adsense;