import './NavBar.css';

export default function NavBar() {
   
  // Navigation links 
  const navLinks = [
    { name: 'Home', href: '/dashboard' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Resources', href: '/resources' },
  ];


  return (
     <nav className="navbar">
      <div className="navbar-container">
        
        {/* Logo */}
        <div className="navbar-logo">
          Learn@House
        </div>

        {/* Navigation Links */}
        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href}>{link.name}</a>
            </li>
          ))}
        </ul>

        {/* Contact Button */}
        <div>
          <button to="/contact" className="navbar-btn">Contact</button>
        </div>
        
      </div>
    </nav>
  )
}
