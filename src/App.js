import React ,{useContext,useEffect} from "react"
import { Route ,Routes,Navigate} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
//import { useNavigate } from "react-router-dom";


import AuthProvider from './store/AuthProvider';
import { AuthContext } from "./store/AuthProvider";

function App() {

  const ctx= useContext(AuthContext)
  console.log(ctx.isLoggedIn)
 // const navigate=useNavigate()

  useEffect(()=>{
    console.log(ctx.isLoggedIn)
  },[ctx.isLoggedIn])

  return (
   <AuthProvider>
      <Layout>
      <Routes> 
        <Route path="/" element={<HomePage />} /> 
        <Route path="/auth" element={<AuthPage />} /> 
        <Route path="/profile" element={<ProfilePage/> }/>
        <Route path="*" element={<HomePage/>}/>
      </Routes>
        
      </Layout>
      </AuthProvider>
  );
}

export default App;
