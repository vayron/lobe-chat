// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.STRIPE_CODE);
// const endpointSecret = 'whsec_e4602f21aa4746222ab1754dbd9940c6c841b90a9a4ca74bc50b92bd8d01866a';

export const runtime = 'edge';

export const POST = async (request: Request) => {
  const result = await request.json();
  console.log('type ==>', result.type);
  try {
    switch (result.type) {
      case 'charge.succeeded': {
        const { billing_details } = result.data.object as any;
        const { email } = billing_details;
        console.log('email:', email);
        break;
      }

      case 'customer.subscription.canceled': {
        console.log(result);
        // console.log('subscription_schedule.canceled');
        break;
      }

      case 'subscription_schedule.created': {
        // console.log('subscription_schedule.created:');
        break;
      }

      case 'checkout.session.completed': {
        // console.log('subscription_schedule.updated');
        break;
      }

      case 'payment_intent.succeeded': {
        // console.log('payment_intent.succeeded:');
        break;
      }
      default:
    }
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  return new Response(undefined, { status: 200 });
};
