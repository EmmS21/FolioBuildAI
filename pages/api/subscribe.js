import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if(req.method === 'POST') {
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'subscription',
                line_items: [
                    {
                        // price: 'price_1ObO56Bjfwe0F0pgc9GPlSyL',
                        price: 'price_1ObOulBjfwe0F0pg1dtDDOof',
                        quantity: 1,
                    },
                ],
                success_url: `${req.headers.origin}/projects?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}/cancel`,        
            });
            res.status(200).json({ id: session.id });  
        } catch (error) {
            res.status(500).json({ statusCode: 500, message: error.message })
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}