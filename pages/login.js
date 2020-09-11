import React from 'react'
import firebase, { auth } from '../firebase/index'
import Head from 'next/head'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import axios from 'axios'

const api = '/api/auth/sessionLogin'

const handleSignIn = async authResult => {
  const urlParams = new URLSearchParams(window.location.search);
  const redirect = urlParams.get('redirect') || ''
  const { data: csrfToken } = await axios.get(api)
  const idToken = await authResult.user.getIdToken()
  await axios.post(api, {idToken, csrfToken})
  await auth.signOut()
  window.location.href = `/${redirect}`
  return false
}

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: handleSignIn
  }
}

const Login = () => {

  return (
    <div>
      <Head>
        <title>Julieta Amelie | Login</title>
      </Head>

      <div className="hero">
        <h1 className="title">Iniciar sesión en Julieta Amelie</h1>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
      </div>
    </div>
  )
}
export default Login