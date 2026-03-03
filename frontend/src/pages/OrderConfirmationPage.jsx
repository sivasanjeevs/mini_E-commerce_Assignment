import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const initialBreakdown = location.state?.breakdown || null;
  const [loading, setLoading] = useState(!initialBreakdown);
  const [error, setError] = useState('');
  const [order, setOrder] = useState(initialBreakdown);

  useEffect(() => {
    const fetchOrder = async () => {
      if (order || !orderId) return;

      try {
        const res = await fetch(`http://localhost:5000/api/orders/${orderId}`);
        if (!res.ok) {
          throw new Error('Failed to load order details');
        }
        const data = await res.json();
        setOrder({
          orderId: data._id,
          subtotal: data.subtotal,
          discounts: data.discounts,
          total: data.total,
        });
      } catch (err) {
        setError(err.message || 'Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [order, orderId]);

  if (loading) {
    return <p className="muted-text">Loading your order…</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  if (!order) {
    return <p className="muted-text">Order details not available.</p>;
  }

  return (
    <section aria-labelledby="order-heading">
      <div className="section-header">
        <h2 id="order-heading">Order placed successfully</h2>
        <span className="badge">Order summary</span>
      </div>

      <div style={{ marginBottom: '0.75rem' }}>
        <button
          type="button"
          className="nav-button"
          onClick={() => navigate('/products')}
        >
          ← Back to products
        </button>
      </div>

      <div className="checkout-breakdown">
        <div className="checkout-row">
          <span className="muted-text">Order ID</span>
          <span>{order.orderId}</span>
        </div>
        <div className="checkout-row">
          <span className="muted-text">Subtotal</span>
          <span>₹{order.subtotal.toFixed(2)}</span>
        </div>
        {order.discounts.length > 0 ? (
          order.discounts.map((d) => (
            <div key={d.label} className="checkout-row">
              <span className="muted-text">{d.label}</span>
              <span>-₹{d.amount.toFixed(2)}</span>
            </div>
          ))
        ) : (
          <div className="checkout-row">
            <span className="muted-text">Discounts</span>
            <span>₹0.00</span>
          </div>
        )}
        <div className="checkout-row checkout-row--total">
          <span>Total</span>
          <span>₹{order.total.toFixed(2)}</span>
        </div>
      </div>
    </section>
  );
}

