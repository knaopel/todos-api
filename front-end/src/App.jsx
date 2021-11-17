import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import "./App.css";
// import Signup from './pages/Signup';
import Home from "./pages/Home";
// import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core';
// import PartnerLogins from './pages/PartnerLogins';
// import PartnerLogin from './pages/PartnerLogin';

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       light: '#33c9dc',
//       main: '#FF5722',
//       dark: '#d50000',
//       contrastText: '#fff'
//     }
//   }
// });

const App = () => {
  return (
    // <MuiThemeProvider theme={theme}>
    <Router>
      <div>
        <Routes>
          <Route exact path="/login" element={<Login history={location.history} />} />
          {/* <Route exact path="/signup" component={Signup} /> */}
          <Route exact path="/" element={<Home />} />
          {/* <Route path="/partnerlogin/:provider" component={PartnerLogin} /> */}
          {/* <Route path="/partnerlogin" component={PartnerLogins} /> */}
        </Routes>
        {/* <Button variant="contained">Hello There!</Button> */}
      </div>
    </Router>
    // </MuiThemeProvider>
  );
};

export default App;
