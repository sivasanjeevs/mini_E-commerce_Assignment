import { useCart } from '../context/CartContext.jsx';

export default function CartPanel({ open }) {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <aside className={`cart-panel ${open ? 'cart-panel--open' : ''}`}>
      <div className="cart-panel__header">
        <h2>Cart</h2>
        <button
          type="button"
          className="cart-panel__clear"
          onClick={clearCart}
          disabled={items.length === 0}
        >
          Clear
        </button>
      </div>

      {items.length === 0 ? (
        <p className="muted-text">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item__main">
                  <div>
                    <p className="cart-item__name">{item.name}</p>
                    <p className="cart-item__meta">
                      {item.category} · ₹{item.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="cart-item__remove"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
                <div className="cart-item__controls">
                  <label className="cart-item__qty-label">
                    Qty
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, Number.parseInt(e.target.value, 10) || 1)
                      }
                    />
                  </label>
                  <span className="cart-item__line-total">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-panel__footer">
            <div>
              <span className="muted-text">Subtotal</span>
              <div className="cart-panel__total">₹{total.toFixed(2)}</div>
            </div>
            <button type="button" className="nav-button nav-button--active" disabled>
              Checkout (coming soon)
            </button>
          </div>
        </>
      )}
    </aside>
  );
}

