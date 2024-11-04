import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './ProfileForm.module.css';
import { AuthContext } from '../../store/AuthProvider';

const ProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const newPasswordRef = useRef();
  const ctx = useContext(AuthContext);
  console.log(ctx.isLoggedIn)
  const navigate=useNavigate()

  const changePassword = (event) => {
    event.preventDefault()
    setIsLoading(true);
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBs_bJk9daTBYGVyxklTixePrZp-DwrL9w`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken: ctx.token,
        password: newPasswordRef.current.value, 
        returnSecureToken: true,
      }),
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Password update failed!';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        newPasswordRef.current.value = ''; 
        alert('Password updated successfully!');
          navigate('/auth')
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false);
        alert(error.message);
      });
  };

  return (
    <form className={classes.form} onSubmit={changePassword}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button type='submit' disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Change Password'}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
