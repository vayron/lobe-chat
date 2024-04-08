import Stripe from 'stripe';

import { cancelSubscription, payment, subscription } from '../firebase/subscription';

const stripe = new Stripe(process.env.STRIPE_CODE);

export const POST = async (request: Request) => {
  const result = await request.json();
  try {
    switch (result.type) {
      // 订阅模式
      case 'checkout.session.completed': {
        const { currency, amount_total, customer_details, mode } = result.data.object;
        const { email } = customer_details as any;

        /**
         * mode: payment || subscription
         * **/

        if (mode === 'subscription') {
          subscription(email, {
            amount_total,
            currency,
          });
        } else if (mode === 'payment') {
          payment(email, {
            amount_total,
            currency,
          });
        }
        break;
      }

      // 取消订阅 在某个时间点
      case 'customer.subscription.updated': {
        const { customer, cancel_at } = result.data.object as any;
        try {
          const customerData = (await stripe.customers.retrieve(customer)) as any;
          if (customerData?.email) {
            cancelSubscription(customerData.email, cancel_at * 1000);
          }
        } catch (e) {
          console.log('e: ', e);
        }
        break;
      }

      // 立即取消订阅
      case 'customer.subscription.deleted': {
        const { customer } = result.data.object as any;
        try {
          const customerData = (await stripe.customers.retrieve(customer)) as any;
          if (customerData?.email) {
            cancelSubscription(customerData.email);
          }
        } catch (e) {
          console.log('e: ', e);
        }
        break;
      }
      default:
    }
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  return new Response(undefined, { status: 200 });
};
export const runtime = 'edge';
