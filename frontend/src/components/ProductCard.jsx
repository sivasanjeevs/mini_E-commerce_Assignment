import { useCart } from '../context/CartContext.jsx';

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <article className="product-card">
      <header className="product-card__header">
        <h3 className="product-card__name">{product.name}</h3>
        <span className="product-card__category">{product.category}</span>
      </header>
      <p className="product-card__price">
        ₹{product.price.toFixed(2)}
      </p>
      <button
        type="button"
        className="product-card__add"
        onClick={() => addItem(product)}
      >
        Add to cart
      </button>
    </article>
  );
}

