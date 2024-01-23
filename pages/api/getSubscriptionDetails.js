// pages/api/getSubscriptionDetails.js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body; 
    try {
      const customers = await stripe.customers.list({
        email: email,
        limit: 1
      });
      if (customers.data.length > 0) {
        const customerId = customers.data[0].id;
        const subscriptions = await stripe.subscriptions.list({ customer: customerId });
        if (subscriptions.data.length > 0) {
          const latestSubscription = subscriptions.data[0];
          res.status(200).json({ expiresOn: latestSubscription.current_period_end });
        } else {
          res.status(200).json({ message: 'No active subscriptions found' });
        }
      } else {
        res.status(200).json({ message: 'Customer not found' });
      }
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
