import { 
  InstagramOutlined,
  FacebookOutlined,
  WhatsAppOutlined,
  YoutubeOutlined,
} from '@ant-design/icons'
import useSWR from 'swr'
import styles from './socialLinks.module.css'

const fetcher = url => fetch(url).then(r => r.json())

const icons = {
  'instagram': <InstagramOutlined/>,
  'whatsapp': <WhatsAppOutlined/>,
  'facebook': <FacebookOutlined/>,
  'youtube': <YoutubeOutlined/>
}

export default function socialLinks({style, linksStyle}) {
  const {data, error} = useSWR('/api/customization/contactData', fetcher)
  if(!data) return <></>

  const SocialLink = ({name}) => {

    return (
      <a 
        href={data[name]}
        className={styles.link}
        style={linksStyle}
        target="_blank"
      >
        {icons[name]}
      </a>
    )
  }
  return (
    <div className={styles.container} style={style}>
      {Object.keys(data).map(name => (
        <SocialLink
          key={name}
          name={name}
        />
      ))}
    </div>
  )
}