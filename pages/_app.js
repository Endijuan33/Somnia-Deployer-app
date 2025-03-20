// pages/_app.js
import '../styles/global.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.crypto) {
      import('crypto').then((cryptoModule) => {
        window.crypto = cryptoModule.webcrypto;
      });
    }
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
