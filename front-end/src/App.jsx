import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import PartnerLogins from './pages/PartnerLogins';
import PartnerLogin from './pages/PartnerLogin';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#FF5722',
      dark: '#d50000',
      contrastText: '#fff'
    }
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/" component={Home} />
            <Route path="/partnerlogin/:provider" component={PartnerLogin} />
            <Route path="/partnerlogin" component={PartnerLogins} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
