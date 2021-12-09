import { Navigate } from "react-router-dom";
import Login from "./pages/Login";

const routes = (isLoggedIn) => [
  {
    path: "/app",
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [

    ],
  },
  {
path:'/',
element: !isLoggedIn?<MainLayout />:<Navigate to="/app/dashboard" />,
children:[
  {path:'login', element: <Login />},
  {path:'/',element:<Navigate to="/login" />}
]
  },
];

const DashboardLayout = ()=> {
  return <h3>Dashboard Layout</h3>
};

const MainLayout = ()=> {
  return <h3>Main Layout</h3>
};

export default routes;
