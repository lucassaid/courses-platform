import React from 'react'
import firebase, { auth } from '../firebase/index'
import Head from 'next/head'
import axios from 'axios'
import { Button } from 'antd'
import { GoogleOutlined } from '@ant-design/icons'

const api = '/api/sessionLogin'

const handleSignIn = async authResult => {
  const { data: csrfToken } = await axios.get(api)
  const idToken = await authResult.user.getIdToken()
  await axios.post(api, {idToken, csrfToken})
  await auth.signOut()

  // redirect
  const urlParams = new URLSearchParams(window.location.search)
  window.location.href = urlParams.get('redirect') || '/'
  return false
}

// const uiConfig = {
//   // Popup signin flow rather than redirect flow.
//   signInFlow: 'popup',
//   // We will display Google and Facebook as auth providers.
//   signInOptions: [
//     firebase.auth.EmailAuthProvider.PROVIDER_ID,
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID
//   ],
//   callbacks: {
//     signInSuccessWithAuthResult: handleSignIn
//   }
// }

const provider = new firebase.auth.GoogleAuthProvider();

const Login = () => {

  const login = async () => {
    try {
      const authResult = await firebase.auth().signInWithPopup(provider)
      handleSignIn(authResult)
    } catch(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
    }
  }

  return (
    <div>
      <Head>
        <title>Julieta Amelie | Login</title>
      </Head>

      <div className="pt-11 md:pt-28">
        <div className="w-11/12 max-w-sm text-center mx-auto p-10 border border-gray-200 rounded-lg">
          <img
            src='/images/logo.png'
            alt="Juli Amelie login"
            className="w-24 mx-auto mb-4"
          />
          <h1 className="text-xl font-medium mb-8">
            Iniciar sesión en Julieta Amelie
          </h1>
          <Button
            type="primary"
            style={{backgroundColor: '#ea4335', border: 'none'}}
            onClick={login}
            className="p-0 px-5"
          >
            <div className="flex text-lg items-center">
              <GoogleOutlined className="mr-2"/>
              Entrar con google
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}
export default Login