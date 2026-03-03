## Frontend (React) – Simple E‑Commerce

This is the React + Vite frontend for the simple e‑commerce demo.

### Tech stack

- React
- React Router
- Context API (for cart state)
- Vite dev server

### How to run

```bash
cd frontend
npm install
npm run dev      # usually http://localhost:5173
```

Make sure the backend is running on `http://localhost:5000` so that product and checkout API calls succeed.

### Routes and UI overview

- `/products`
  - Main product catalog page.
  - Each card shows product name, category, and price.
  - `Add to cart` button adds the product to the cart.
- `/cart`
  - Shows all cart items, quantities, and the subtotal.
  - Lets you change quantity, remove items, or **Clear** the cart.
  - Shows a note explaining the discount rules:
    - 10% off any category where your spend is over ₹150.
    - 5% off any product where you buy 3 or more units.
  - **Place order** calls the backend `/api/checkout` endpoint.
- `/order/:orderId`
  - Order confirmation / bill page.
  - Displays the order ID, subtotal, discount lines, and final total.

### Header and navigation

- The top center of the page shows:
  - Title: `Simple E‑Commerce`
  - Two discount badges:
    - `10% off categories over ₹150`
    - `5% off when you buy 3+ of a product`
- Top‑right navigation:
  - `Products` and `Cart` buttons (React Router `NavLink`s).
  - Shows a cart badge with the total number of items.

