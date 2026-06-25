import { stripe } from "@/lib/stripe";


export const runtime = "nodejs";

export async function POST(req) {

  try {

    const body = await req.text();

    const signature = req.headers.get("stripe-signature");

    const event = stripe.webhooks.constructEvent(

      body,

      signature,

      process.env.STRIPE_WEBHOOK_SECRET

    );

    console.log("WEBHOOK:", event.type);

    if (

      event.type === "checkout.session.completed"

    ) {

      const session = event.data.object;

      const client = await clientPromise;

      const db = client.db("promptbay-db");

      const email =

        session.customer_details?.email ||

        session.customer_email ||

        session.metadata?.email;

      const plan = session.metadata?.plan;

      if (!email) {

        throw new Error("Email Missing");

      }

      const alreadyPaid = await db

        .collection("payment_history")

        .findOne({

          sessionId: session.id,

        });

      if (alreadyPaid) {

        return Response.json({

          ok: true,

        });

      }

     

      await db

        .collection("payment_history")

        .insertOne({

          sessionId: session.id,

          stripeCustomerId: session.customer,

          email,

          plan,

          status: "paid",

          amount:

            (session.amount_total || 0) / 100,

          currency: session.currency,

          createdAt: new Date(),

        });

    

      await db

        .collection("users")

        .updateOne(

          {

            email,

          },

          {

            $set: {

              plan,

              subscriptionStatus: "active",

              stripeCustomerId: session.customer,

              subscriptionStarted: new Date(),

            },

          },

          {

            upsert: false,

          }

        );

      console.log("USER UPDATED");

    }

    return Response.json({

      success: true,

    });

  } catch (error) {

    console.log("WEBHOOK ERROR:", error);

    return Response.json(

      {

        success: false,

        message: error.message,

      },

      {

        status: 500,

      }

    );

  }

}