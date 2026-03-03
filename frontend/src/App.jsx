import { NavLink, Outlet } from 'react-router-dom';
import './App.css';
import { useCart } from './context/CartContext.jsx';

function App() {
  const { itemCount } = useCart();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__title">
          <h1>Simple E‑Commerce</h1>
          <p className="muted-text">
            <span className="discount-pill">10% off categories over ₹150</span>
            <span className="discount-pill">5% off when you buy 3+ of a product</span>
          </p>
        </div>

        <nav className="app-nav">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `nav-button ${isActive ? 'nav-button--active' : ''}`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `nav-button ${isActive ? 'nav-button--active' : ''}`
            }
          >
            Cart
            {itemCount > 0 ? <span className="cart-count">{itemCount}</span> : null}
          </NavLink>
        </nav>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

    </div>
  );
}

export default App;
