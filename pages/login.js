import React, { useEffect } from 'react'
import { auth, firebase } from '../firebase'
import Head from 'next/head'

const Login = () => {

  useEffect(() => {
    var firebaseui = require('firebaseui');
    try {
      const ui = new firebaseui.auth.AuthUI(firebase.auth());
      const authContainer = document.getElementById('loginUi')
      ui.start(authContainer, {
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        ],
        // Other config options...
      });
    } catch(e) {

    }
  }, [])

  const handleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    auth.signInWithPopup(provider)
      .then(() => {
        alert('You are signed In');
      })
      .catch(err => {
        alert('OOps something went wrong check your console');
        console.log(err);
      });
  }
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        alert('Logout successful');
      })
      .catch(err => {
        alert('OOps something went wrong check your console');
        console.log(err);
      });
  }

  return (
    <div>
      <Head>
        <title>Julieta Amelie | Login</title>
      </Head>

      <div className="hero">
        <h1 className="title">Welcome to Firebase Authentication in Next.js!</h1>
        <p className="description">
          Click on the Dashboard link to visit the dashboard page.
        </p>
        <div id="loginUi"></div>
        <div className="row">
          <button onClick={handleSignIn}>Sign In using google</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  )
}
export default Login