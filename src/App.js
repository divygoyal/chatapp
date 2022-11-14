// import logo from './logo.svg';
// import './App.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import {  Navigate } from "react-router-dom";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  BrowserRouter,
  Link,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/Authcontext";
import { app } from "./firebase";
// const cors = require ('cors');
// import firebase from './firebase';
// import firestore from '@react-native-firebase/firestore';
// app.use(cors());
function App() {

  // const {currentUser} =useContext(AuthContext)
  

  const { currentUser } = useContext(AuthContext);
  console.log(currentUser)
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };
  // firebase.firestore().settings({ experimentalForceLongPolling: true })
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

    
  
}

export default App;
