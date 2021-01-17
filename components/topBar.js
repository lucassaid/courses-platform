import Link from 'next/link'
import { Space } from 'antd'
import { Container } from './section'
import useScrollQuery from '../lib/useScrollQuery'

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

const TopBar = () => {

  const scrolled = useScrollQuery(50)

  return(
    <nav className={`${scrolled ? 'h-16' : 'h-20'} transition-all duration-300 fixed w-full z-20 bg-white bg-opacity-90`}>
      <Container className="flex h-full justify-between items-center">
        <Link href="/">
          <a alt="al inicio">
            <img
              className={`transition-all duration-300 ${scrolled ? 'w-12' : 'w-14'}`}
              src="/images/logo.png"
              alt="Julieta Amelie"
            />
          </a>
        </Link>

        <Space size="large">
          {navItems.map(item => (
            <Link href={item.href} key={item.href}>
              <a
                className="text-lg"
                alt={item.label}
              >
                {item.label}
              </a>
            </Link>
          ))}
        </Space>
      </Container>
    </nav>
  )
}
export default TopBar