import React, {useState, useEffect} from 'react';
import router from 'next/router';
import { auth } from '../firebase';

const withAuth = (Component) => {

  function withAuth(props) {

    const [status, setStatus] = useState('LOADING')

    useEffect(() =>{
      auth.onAuthStateChanged(authUser => {
        console.log(authUser);
        if(authUser) {
          setStatus('SIGNED_IN');
        } else {
          router.push('/');
        }
      });
    }, [])

    function renderContent() {
      if(status == 'LOADING') {
        return <h1>Loading ......</h1>;
      } else if(status == 'SIGNED_IN') {
        return <Component { ...props } />
      }
    }

    return (
      <>
        {renderContent()}
      </>
    );
  }

  const ComponentName = Component.displayName
    || Component.name
    || 'Component';

  withAuth.displayName = `withAuth(${ComponentName})`;
  return withAuth;
}
export default withAuth;