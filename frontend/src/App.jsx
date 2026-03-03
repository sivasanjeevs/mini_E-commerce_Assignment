import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import { useCart } from './context/CartContext.jsx';

const CATEGORIES = ['Shoes', 'Clothing', 'Decor', 'Home', 'Accessories'];
const DISCOUNT_MESSAGES = [
  '% Discount %',
  '10% off categories over ₹10,000',
  '5% off when you buy 5+ of a product',
];

function App() {
  const { itemCount } = useCart();
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__title">
          <h1>Simple E‑Commerce</h1>
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

      <div className="discount-ticker" aria-label="Discount offers">
        <div className="discount-ticker__inner">
          {Array.from({ length: 2 }).map((_, loopIndex) =>
            DISCOUNT_MESSAGES.map((message, index) => (
              <span
                className="discount-ticker__item"
                key={`${loopIndex}-${index}`}
              >
                {message}
              </span>
            )),
          )}
        </div>
      </div>

      <div className="category-strip" aria-label="Product categories">
        <div className="category-strip__track">
          {CATEGORIES.map((category) => (
            <button
              type="button"
              className="category-chip"
              key={category}
              onClick={() =>
                navigate(`/products?category=${encodeURIComponent(category)}`)
              }
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
