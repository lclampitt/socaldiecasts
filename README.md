# SoCal Diecasts — NASCAR Die-Cast E-Commerce Site

A full-featured React + Vite e-commerce website for selling NASCAR die-cast cars. Built with a deep navy/gold motorsport theme, Supabase authentication, and a fully functional cart + checkout flow.

---

## 📁 Project Structure

```
socaldiecasts/
├── index.html
├── package.json
├── vite.config.js
├── .env.example              ← copy to .env and fill in keys
└── src/
    ├── main.jsx
    ├── App.jsx               ← routing setup
    ├── lib/
    │   └── supabase.js       ← Supabase client
    ├── context/
    │   ├── CartContext.jsx   ← global cart state + toasts
    │   └── AuthContext.jsx   ← Supabase auth (login/register)
    ├── data/
    │   └── products.js       ← 18 temp products + filter logic
    ├── components/
    │   ├── Header.jsx / .css ← nav, search dropdown, cart badge
    │   ├── Footer.jsx / .css
    │   ├── ProductCard.jsx / .css
    │   └── AuthModal.jsx / .css
    ├── pages/
    │   ├── Home.jsx / .css       ← hero, categories, featured
    │   ├── Diecasts.jsx / .css   ← all products + filtering
    │   ├── ShopByDriver.jsx/.css ← driver grid + filtered products
    │   ├── About.jsx / .css      ← lorem ipsum about page
    │   ├── Contact.jsx / .css    ← contact form → logannc44@yahoo.com
    │   ├── Cart.jsx / .css       ← cart with qty controls
    │   ├── Checkout.jsx / .css   ← 3-step checkout flow
    │   ├── TrackOrder.jsx / .css ← tracking number lookup
    │   └── Feed.jsx / .css       ← news/updates page
    └── styles/
        ├── global.css        ← CSS variables, utility classes
        └── App.css
```

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
```
Then fill in your keys (see Services Setup below).

### 3. Run locally
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

---

## 🛠 Services Setup

### Supabase (Authentication + Orders Database)
1. Go to [supabase.com](https://supabase.com) and create a free project
2. Copy your **Project URL** and **anon public key** from Settings → API
3. Paste into `.env`:
   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```
4. Run this SQL in your Supabase SQL editor to create the orders table:
   ```sql
   create table orders (
     id uuid default gen_random_uuid() primary key,
     created_at timestamp with time zone default now(),
     user_id uuid references auth.users(id),
     email text,
     items jsonb,
     shipping_address jsonb,
     subtotal numeric,
     shipping_cost numeric,
     tax numeric,
     total numeric,
     tracking_number text unique,
     status text default 'processing'
   );

   -- Allow anyone to insert orders (for guest checkout)
   alter table orders enable row level security;
   create policy "Anyone can insert orders" on orders for insert with check (true);
   create policy "Users can view own orders" on orders for select using (
     auth.uid() = user_id or email = auth.email()
   );
   ```
5. Enable **Email auth** in Authentication → Providers → Email

### EmailJS (Contact Form → logannc44@yahoo.com)
1. Go to [emailjs.com](https://emailjs.com) and create a free account
2. Add an Email Service (connect your Yahoo account or Gmail)
3. Create an Email Template with these variables:
   - `{{from_name}}` — sender's full name
   - `{{from_email}}` — sender's email
   - `{{message}}` — the message body
   - Set "To Email" to `logannc44@yahoo.com`
4. Install the library:
   ```bash
   npm install @emailjs/browser
   ```
5. In `src/pages/Contact.jsx`, uncomment the emailjs import and send block, then fill `.env`:
   ```
   VITE_EMAILJS_SERVICE_ID=service_xxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

### Stripe (Real Payment Processing)
1. Create a [Stripe](https://stripe.com) account
2. Get your **Publishable Key** from the Dashboard
3. Install Stripe:
   ```bash
   npm install @stripe/stripe-js @stripe/react-stripe-js
   ```
4. Replace the payment form in `src/pages/Checkout.jsx` with Stripe Elements
5. Add to `.env`:
   ```
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
   ```
> **Note:** You'll also need a backend (Supabase Edge Functions or a Node server) to create PaymentIntents securely.

---

## ✨ Features

| Feature | Status |
|---|---|
| Product listing with 18 temp SKUs | ✅ |
| Filter by All Diecast, Raced Wins, Elite Premier, Special Finishes | ✅ |
| Search by product name / driver / SKU | ✅ |
| Shop by Driver (28 drivers) | ✅ |
| Add to cart with quantity controls | ✅ |
| Cart badge in header | ✅ |
| Cart page with subtotal, tax, shipping | ✅ |
| 3-step checkout (Shipping → Payment → Confirm) | ✅ |
| Order confirmation with tracking number | ✅ |
| Track Order page by tracking number | ✅ |
| Login / Register via Supabase | ✅ |
| Contact form (needs EmailJS keys) | ✅ |
| Real payments (needs Stripe integration) | 🔧 |
| Responsive mobile layout | ✅ |

---

## 🎨 Design

- **Color Scheme:** Deep navy (#1a3a5c) with gold accents (#f0a500)
- **Fonts:** Barlow Condensed (headers/labels) + Barlow (body)
- **Theme:** Motorsport / collector aesthetic — bold, professional, high-contrast

---

## 📦 Adding Real Products

Edit `src/data/products.js` to add your real inventory. Each product has:
```js
{
  id: 1,
  title: "Kyle Larson 2024 HendrickCars.com Chevy 1:24 Diecast",
  driver: "Kyle Larson",
  price: 79.99,
  category: "All Diecast", // "Raced Win" | "Elite Premier" | "Special Finish"
  sku: "KL5-2024-124",
  image: "https://...",
  inStock: true,
  description: "..."
}
```

Eventually you can move products into a Supabase `products` table and query them with the Supabase client.

---

## 🚢 Deployment

Recommended: **Vercel** (free, instant deploys)
```bash
npm install -g vercel
vercel
```
Add your `.env` variables in the Vercel dashboard under Project Settings → Environment Variables.
