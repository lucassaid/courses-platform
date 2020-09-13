import Link from 'next/link'
import styles from './topBar.module.css'
import { Space } from 'antd'
import { Container } from './section'

const navItems = [
  {
    label: 'Inicio',
    href: '/'
  },
  {
    label: 'Cursos',
    href: '/cursos'
  },
  {
    label: 'Asesorías',
    href: '/asesorias'
  }
]

const TopBar = ({props}) => {

  return(
    <nav className={styles.nav}>
      <Container className={styles.container}>
        <Link href="/">
          <a alt="al inicio">
            <img
              className={styles.logo}
              src="/images/logo.png"
              alt="Julieta Amelie"
            />
          </a>
        </Link>

        <Space size="large">
          {navItems.map(item => (
            <Link href={item.href} key={item.href}>
              <a className={styles.link} alt={item.label}>{item.label}</a>
            </Link>
          ))}
        </Space>
      </Container>
    </nav>
  )
}
export default TopBar