require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE);
const app = express();
const cors=require('cors');

app.use(express.json());
app.use(cors({
      origin: ["http://localhost:5173"],
    }));
const storeItems = new Map([
    [1, { priceInCents: 10000, name: "Learn React Today" }],
    [2, { priceInCents: 20000, name: "Learn CSS Today" }],
  ]);
  
app.post('/create-checkout', async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: req.body.items.map(item => {
          const storeItem = storeItems.get(item.id);
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: storeItem.name,
              },
              unit_amount: storeItem.priceInCents,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
      });
      res.json({ url: session.url });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

app.get('/',(req,res)=>{
    res.json(' payment server is running ')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
  