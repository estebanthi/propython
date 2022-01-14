const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {

    const {item} = req.body
    const transformedItem = {
        price_data: {
            currency: 'eur',
            product_data: {
                name: item.name,
                images: [item.image]
            },
            unit_amount: item.price*100
        },
        description: item.description,
        quantity: 1,
    };

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [transformedItem],
        mode: 'payment',
        success_url: process.env.NEXT_PUBLIC_BASE_URL,
        cancel_url: process.env.NEXT_PUBLIC_BASE_URL,
        metadata: {
            images: item.image,
        },
    });

    res.json({ id: session.id });
}