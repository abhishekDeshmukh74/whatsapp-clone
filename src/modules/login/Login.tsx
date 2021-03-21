import React from 'react';
import { Button } from '@material-ui/core';

import './Login.css';
import { auth, provider } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';

export const Login = () => {
  const [{}, dispatch] = useStateValue();

  const signIn = async () => {
    const result = await auth.signInWithPopup(provider);
    dispatch({
      type: actionTypes.SET_USER,
      user: result.user,
    });
  };

  return (
    <div className='login'>
      <div className='login-container'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg'
          alt='WhatsApp'
        />

        <div className='login-text'>
          <h1>Sign in to WhatsApp</h1>
        </div>

        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
};
