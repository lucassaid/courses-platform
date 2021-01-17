import { 
  InstagramOutlined,
  FacebookOutlined,
  WhatsAppOutlined,
  YoutubeOutlined,
} from '@ant-design/icons'
import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

const icons = {
  'instagram': <InstagramOutlined/>,
  'whatsapp': <WhatsAppOutlined/>,
  'facebook': <FacebookOutlined/>,
  'youtube': <YoutubeOutlined/>
}

export default function socialLinks({style, linksStyle = {}}) {
  const {data, error} = useSWR('/api/customization/contactData', fetcher)
  if(!data) return <></>

  const SocialLink = ({name}) => {

    return (
      <a 
        href={data[name]}
        className="block text-2xl m-3 transition transform hover:scale-125"
        style={{ color: '#4CDAE7', ...linksStyle}}
        target="_blank"
      >
        {icons[name]}
      </a>
    )
  }
  return (
    <div className="flex" style={style}>
      {Object.keys(data).map(name => (
        <SocialLink
          key={name}
          name={name}
        />
      ))}
    </div>
  )
}