import Link from 'next/link'
import styles from './topBar.module.css'
import { Container } from './section'

const TopBar = ({props}) => {

  return(
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
    </Container>
  )
}
export default TopBar