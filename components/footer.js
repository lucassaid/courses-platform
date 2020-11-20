import React from 'react'
import { Card, Avatar } from 'antd'
import Section from './section'
import SocialLinks from './socialLinks'

const { Meta } = Card

const Footer = () => {

  return(
    <footer>
      <Section bgHigh bg bgMirror bgHeight="180%">
        <Meta
          avatar={<Avatar size={64} src="/images/juli-amelie.png" />}
          title="Juli Amelie"
          description="Te acompaño a potenciar tu emprendimiento"
        />
        <SocialLinks linksStyle={{color: 'white'}}/>
      </Section>
      <style jsx>{`
        footer {
          overflow: hidden;
          padding-top: 32px;
          padding-bottom: 0px;
        }
      `}</style>
    </footer>
  )
}
export default Footer