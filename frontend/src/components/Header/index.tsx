// Assets
import Logo from '../../assets/logo.webp'

// Styles
import './index.scss'

function Header() {
  return (
    <header className='page-header'>
      <img src={Logo} alt='Shopper Rides' draggable={false} />
      <h2>Shopper Rides</h2>
    </header>
  )
}

export default Header