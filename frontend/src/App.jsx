import './App.css';

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Simple E‑Commerce</h1>
        <nav>
          <button type="button">Products</button>
          <button type="button">Cart</button>
        </nav>
      </header>

      <main className="app-main">
        <section>
          <h2>Product list</h2>
          <p>This is where users will browse products.</p>
        </section>
      </main>

      <footer className="app-footer">
        <small>Backend: Node.js + MongoDB · Frontend: React</small>
      </footer>
    </div>
  );
}

export default App;
