// Assets
import Logo from '../../assets/logo.webp'

// Styles
import './index.scss'

function Header() {
  return (
    <header className='page-header'>
      <img src={Logo} alt='Shopper Rides' draggable={false} />
      <h1>Shopper Rides</h1>
    </header>
  )
}

export default Header