import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

export async function POST(req) {
  try {
    const { plan, email } = await req.json();

    const plans = {
      pro: {
        price: process.env.STRIPE_PRO_PRICE_ID,
      },
      growth: {
        price: process.env.STRIPE_GROWTH_PRICE_ID,
      },
      premium: {
        price: process.env.STRIPE_PREMIUM_PRICE_ID,
      },
    };

    if (!plans[plan]) {
      return NextResponse.json(
        {
          message: "Invalid plan",
        },
        {
          status: 400,
        }
      );
    }

    const origin = (await headers()).get("origin");

    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      metadata: {
        plan,
        email,
      },
      line_items: [
        {
          price: plans[plan].price,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}