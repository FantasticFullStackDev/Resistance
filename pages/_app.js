import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from "@mui/material/styles";
import { store } from '../reducer/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

// Global Stylesheet
import "../styles/globals.css";
import GlobalStyle from '../shared/components/GlobalStyle';

// Resources
import theme from '../resources/ResistanceTheme';
import { RContextProvider } from '../hooks/useRContext';

function Resistance({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <RContextProvider>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <GlobalStyle />
            <div>
              {typeof window !== 'undefined' ? <Component {...pageProps} />:null }
            </div>
          </Provider>
        </ThemeProvider>
      </RContextProvider>
    </SessionProvider>
  );
}

export default Resistance;