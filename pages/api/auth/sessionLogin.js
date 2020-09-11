import admin from '../../../firebase/admin'
import cookies from '../../../utils/cookies'
import Tokens from 'csrf'

const tokens = new Tokens()

const secret = tokens.secretSync()

const handler = async (req, res) => {
  if(req.method === 'GET') {
    try {
      var token = tokens.create(secret)
      res.send(token)
    } catch(err) {
      console.log("Error creating csrf token", err)
      res.status(401).send('Error creating csrf token!');
    }
  } 
  if(req.method === 'POST') {
    try {
      // Get the ID token passed and the CSRF token.
      const idToken = req.body.idToken.toString();
      const csrfToken = req.body.csrfToken.toString();
      // Guard against CSRF attacks.
      if(!tokens.verify(secret, csrfToken)) {
        res.status(401).send('UNAUTHORIZED REQUEST!');
        return;
      }
      // Set session expiration to 5 days.
      const expiresIn = 60 * 60 * 24 * 5 * 1000;
      // Create the session cookie. This will also verify the ID token in the process.
      // The session cookie will have the same claims as the ID token.
      // To only allow session cookie setting on recent sign-in, auth_time in ID token
      // can be checked to ensure user was recently signed in before creating a session cookie.
      const sessionCookie = await admin.auth().createSessionCookie(idToken, {expiresIn})
      // Set cookie policy for session cookie.
      const options = {maxAge: expiresIn, httpOnly: true, secure: false};
      
      res.cookie('session', sessionCookie, options)
      res.end(JSON.stringify({status: 'success'}));
    } catch(err) {
      console.log("Error creating cookie", err)
      res.status(401).send('UNAUTHORIZED REQUEST!');
    }
  }
}

export default cookies(handler)