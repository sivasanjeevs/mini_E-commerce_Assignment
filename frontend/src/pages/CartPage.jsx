import CartPanel from '../components/CartPanel.jsx';

export default function CartPage() {
  return (
    <section aria-labelledby="cart-heading">
      <div className="section-header">
        <h2 id="cart-heading">Your Cart</h2>
        <span className="badge">Review &amp; checkout</span>
      </div>

      <CartPanel open />
    </section>
  );
}

