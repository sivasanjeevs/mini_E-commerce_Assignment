import { useEffect, useState } from 'react';
import ProductCard from './ProductCard.jsx';

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        if (!res.ok) {
          throw new Error('Failed to load products');
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="muted-text">Loading products…</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  if (products.length === 0) {
    return <p className="muted-text">No products available.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product._id || product.name} product={product} />
      ))}
    </div>
  );
}

