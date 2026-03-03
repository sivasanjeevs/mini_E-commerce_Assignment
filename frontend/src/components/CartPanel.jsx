import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function CartPanel({ open }) {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();
  const [checkoutState, setCheckoutState] = useState({
    loading: false,
    error: '',
    breakdown: null,
  });

  const handleCheckout = async () => {
    if (items.length === 0 || checkoutState.loading) return;

    setCheckoutState({ loading: true, error: '', breakdown: null });

    try {
      const res = await fetch('http://localhost:5000/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      if (!res.ok) {
        throw new Error('Checkout failed');
      }

      const data = await res.json();
      clearCart();
      setCheckoutState({ loading: false, error: '', breakdown: null });
      navigate(`/order/${data.orderId}`, { state: { breakdown: data } });
    } catch (err) {
      setCheckoutState({
        loading: false,
        error: err.message || 'Checkout failed',
        breakdown: null,
      });
    }
  };

  return (
    <aside className={`cart-panel ${open ? 'cart-panel--open' : ''}`}>
      <div className="cart-panel__header">
        <h2>Cart</h2>
        <button
          type="button"
          className="cart-panel__clear"
          onClick={() => {
            clearCart();
            setCheckoutState({ loading: false, error: '', breakdown: null });
          }}
          disabled={items.length === 0}
        >
          Clear
        </button>
      </div>

      <p className="muted-text">
        Spend over ₹150 in any category to get 10% off that category. 
      </p>
      <p className="muted-text">Buy 3 or more of the
        same product to get 5% off that product.
      </p>

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
                      onChange={(e) => {
                        updateQuantity(item.id, Number.parseInt(e.target.value, 10) || 1);
                        setCheckoutState({ loading: false, error: '', breakdown: null });
                      }}
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
            <button
              type="button"
              className="nav-button nav-button--active"
              onClick={handleCheckout}
              disabled={items.length === 0 || checkoutState.loading}
            >
              {checkoutState.loading ? 'Placing order…' : 'Place order'}
            </button>
          </div>

          {checkoutState.error ? (
            <p className="error-text">{checkoutState.error}</p>
          ) : null}
        </>
      )}
    </aside>
  );
}