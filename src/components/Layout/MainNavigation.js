import React,{useContext} from 'react';
import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';

import { AuthContext } from '../../store/AuthProvider';

const MainNavigation = () => {
  const ctx=useContext(AuthContext)
  console.log(ctx.isLoggedIn)

   const logoutHandler=()=>{
      ctx.logout()
   }
   return(
   <header className={classes.header}>
   <Link to='/'>
     <div className={classes.logo}>React Auth</div>
   </Link>
   <nav>
     <ul>
       {!ctx.isLoggedIn && (
         <li>
           <Link to='/auth'>Login</Link>
         </li>
       )}
       {ctx.isLoggedIn && (
         <>
           <li>
             <Link to='/profile'>Profile</Link>
           </li>
           <li>
             <button onClick={logoutHandler}>Logout</button>
           </li>
         </>
       )}
     </ul>
   </nav>
 </header>
);
};

export default MainNavigation;
