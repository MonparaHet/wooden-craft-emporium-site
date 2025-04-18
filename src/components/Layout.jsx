
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Sun, Moon, Menu, X, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import WoodenLogo from './WoodenLogo';

const Layout = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { currentUser, logout, isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { title: 'Home', path: '/home' },
    { title: 'Products', path: '/products' },
    { title: 'Inquiry', path: '/inquiry' },
    { title: 'About Us', path: '/about' },
    { title: 'Contact', path: '/contact' }
  ];

  if (isAdmin()) {
    navLinks.push({ title: 'Admin', path: '/admin' });
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="bg-card shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/home" className="flex items-center space-x-2">
                <WoodenLogo />
                <span className="text-xl font-bold text-foreground">Bapa Sitaram</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-2 py-1 transition-colors hover:text-primary ${
                    location.pathname === link.path ? 'text-primary font-medium' : 'text-foreground'
                  }`}
                >
                  {link.title}
                </Link>
              ))}
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm">{currentUser?.name}</span>
                <button 
                  onClick={handleLogout} 
                  className="btn-wooden"
                  aria-label="Log out"
                >
                  <LogOut size={18} />
                  <span className="ml-1">Logout</span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card shadow-lg">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-2 py-2 transition-colors ${
                    location.pathname === link.path ? 'text-primary font-medium' : 'text-foreground'
                  }`}
                  onClick={closeMobileMenu}
                >
                  {link.title}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-2 border-t border-muted">
                <div className="flex items-center">
                  <User size={18} className="mr-2" />
                  <span className="text-sm">{currentUser?.name}</span>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="btn-wooden"
                  aria-label="Log out"
                >
                  <LogOut size={18} />
                  <span className="ml-1">Logout</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Bapa Sitaram Wooden Box</h3>
              <p className="text-muted-foreground">
                Quality wooden craftsmanship since 1985
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Contact</h3>
              <address className="not-italic text-muted-foreground">
                123 Wood Lane<br />
                Carpenter's District<br />
                Gujarat, India<br />
                <a href="tel:+9199999999" className="hover:text-primary transition-colors">
                  +91 99999 99999
                </a>
              </address>
            </div>
          </div>
          <div className="border-t border-border mt-6 pt-6 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Bapa Sitaram Wooden Box. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
