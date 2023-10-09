import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import Layout from "./Components/Layout/Layout";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            {" "}
            <Home />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
