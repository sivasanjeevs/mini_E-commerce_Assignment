import './App.css';
import ProductGrid from './components/ProductGrid.jsx';

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Simple E‑Commerce</h1>
          <p className="muted-text">Browse products and build your cart.</p>
        </div>

        <nav className="app-nav">
          <button type="button" className="nav-button nav-button--active">
            Products
          </button>
          <button type="button" className="nav-button" disabled>
            Cart
          </button>
        </nav>
      </header>

      <main className="app-main">
        <section aria-labelledby="products-heading">
          <div className="section-header">
            <h2 id="products-heading">Products</h2>
            <span className="badge">Catalog</span>
          </div>

          <ProductGrid />
        </section>
      </main>

      <footer className="app-footer">
        <small className="muted-text">
          Stack: React · Node.js · MongoDB
        </small>
      </footer>
    </div>
  );
}

export default App;
