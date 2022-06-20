import { DAppProvider } from '@usedapp/core'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from 'react-redux';
import { ScopedCssBaseline } from '@mui/material'
import AppRouter from './AppRouter';
import { SnackbarProvider } from 'notistack'

import config from './config/theme.json'
import { useEffect } from 'react';

let themeConfig = {
  palette: {
    primary: {
      light: config.main['--primary-theme-color-light'],
      main: config.main['--primary-theme-color'],
      dark: config.main['--primary-theme-color-dark']
    },
    secondary: {
      light: config.main['--secondary-theme-color-light'],
      main: config.main['--secondary-theme-color'],
      dark: config.main['--secondary-theme-color-dark']
    }
  }
}

const muiTheme = {
  dark: createTheme({
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none'
          }
        }
      }
    },
    palette: {
      ...themeConfig.palette,
      mode: 'dark',
      background: {
        default: config.dark['--primary-bg-color'],
        paper: config.dark['--secondary-bg-color']
      }
    }
  }),
  light: createTheme({
    palette: {
      ...themeConfig.palette,
      mode: 'light',
      background: {
        default: config.light['--primary-bg-color'],
        paper: config.light['--secondary-bg-color']
      }
    }
  })
}

function App() {
  const theme = useSelector((state) => state.theme)

  useEffect(() => {
    for(let key in config['main']) {
      document.querySelector(':root').style.setProperty(key, config['main'][key])
    }
  }, [])

  useEffect(() => {
    for(let key in config[theme]) {
      document.querySelector(':root').style.setProperty(key, config[theme][key])
    }
  }, [theme])

  return (
    <SnackbarProvider maxSnack={4}>
      <DAppProvider config={{}}>
        <ThemeProvider theme={muiTheme[theme]}>
          <ScopedCssBaseline>
            <AppRouter />
          </ScopedCssBaseline>
        </ThemeProvider>
      </DAppProvider>
    </SnackbarProvider>
  );
}

export default App;
