import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router'

export default function withFetch(WrappedComponent, fetchData, matchRoute) {

  function withFetch(props) {

    const router = useRouter()
    const id = router.query[matchRoute]

    const [data, setData] = useState()
    
    const getData = async (id) => {
      const data = await fetchData(id)
      setData(data)
    }
    
    useEffect(() => {
      if(!matchRoute) getData()
      if(matchRoute && id) getData(id)
    }, [id])

    return(
      <WrappedComponent data={data} {...props}></WrappedComponent>
    )
  }

  const WrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';

  withFetch.displayName = `withAuth(${WrappedComponentName})`;
  return withFetch;
}