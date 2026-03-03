import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid.jsx';

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const navigate = useNavigate();

  return (
    <section aria-labelledby="products-heading">
      <div className="section-header">
        <h2 id="products-heading">
          {category ? `Products – ${category}` : 'Products'}
        </h2>
        {category ? (
          <button
            type="button"
            className="category-back-button"
            onClick={() => navigate('/products')}
          >
            ← Back to all products
          </button>
        ) : null}
      </div>

      <ProductGrid category={category} />
    </section>
  );
}

