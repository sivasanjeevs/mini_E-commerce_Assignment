import ProductGrid from '../components/ProductGrid.jsx';

export default function ProductsPage() {
  return (
    <section aria-labelledby="products-heading">
      <div className="section-header">
        <h2 id="products-heading">Products</h2>
        <span className="badge">Catalog</span>
      </div>

      <ProductGrid />
    </section>
  );
}

