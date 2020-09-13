import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
// import { getUser } from '../lib/authenticate'

const fetcher = url => fetch(url).then(r => r.json())

export default function useUser(adminRequired) {
  const swr = useSWR('/api/user', fetcher)
  useEffect(() => {
    if(swr.data && (!swr.data.user || (adminRequired && !swr.data.user.admin))) {
      // redirect to login
      Router.replace(
        `/login?redirect=/admin`
      )
    }
  }, [swr.data])

  swr.isLoggedOut = swr.data && !swr.data.user
  swr.user = swr.data?.user

  return swr
}