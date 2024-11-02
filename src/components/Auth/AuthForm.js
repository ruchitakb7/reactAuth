import { useState, useRef } from 'react';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    if(!isLogin)
    {

    }
    else{
          const url= `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBs_bJk9daTBYGVyxklTixePrZp-DwrL9w`;
    
          fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
          }).then((res) => {
            setIsLoading(false);
            if (res.ok) {
              alert('login successfully')
            }
        }).catch(() => {
          setIsLoading(false);
          alert("failed. Try once again");
        });   
      
  };
}

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button type='submit'>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Sending...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
            disabled={isLoading}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;