import '../styles/global.css'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import store from '../store'
import NProgress from 'nprogress'
import Router from 'next/router'
import "nprogress/nprogress.css";
import { useEffect } from 'react'
import { useRouter } from 'next/router'

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

const MyApp = ({ Component, pageProps }) => {

  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      document.body.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
