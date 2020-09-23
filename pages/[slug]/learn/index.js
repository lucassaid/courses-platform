/* this page only redirects */
import Head from 'next/head'
import { useRouter } from 'next/dist/client/router'
import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

export default function Index() {
  
  const router = useRouter()
  const { slug } = router.query
  const {data: course, error} = useSWR(() => `/api/courses/${slug}`, fetcher)

  // redirect to first lesson
  React.useEffect(() => {
    if(course) {
      const firstLesson = course.lessonsOrder[0]
      router.push('/[slug]/learn/[id]', `/${slug}/learn/${firstLesson}`)
    }
  }, [course])

  if(error) router.push('/')

  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  )
}