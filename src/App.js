import { DAppProvider } from '@usedapp/core'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from 'react-redux';
import { ScopedCssBaseline } from '@mui/material'
import AppRouter from './AppRouter';
import { SnackbarProvider } from 'notistack'

let themeConfig = {
  palette: {
    primary: {
      light: '#df13a2',
      main: "#d01498",
      dark: '#cc1896'
    },
    secondary: {
      light: '#6480d4',
      main: '#647ecb',
      dark: '#516ab4'
    }
  }
}

const muiTheme = {
  dark: createTheme({
    palette: {
      ...themeConfig.palette,
      mode: 'dark',
      background: {
        default: '#0c0414',
        paper: '#121a24'
      }
    }
  }),
  light: createTheme({
    palette: {
      ...themeConfig.palette,
      mode: 'light',
      background: {
        default: '#fbf8fa',
        paper: '#ffffff'
      }
    }
  })
}

function App() {
  const theme = useSelector((state) => state.theme)

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
