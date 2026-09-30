import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function Layout() {
  return (
    <div>
      {/* Persistent Navigation Bar */}
      <NavBar />

      {/* Dynamic Page Content Renders Here */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
}