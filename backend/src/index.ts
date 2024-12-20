import express, { Request, Response } from "express";
import cors from "cors";
import authRoute from "./routes/auth-route";
import petRoute from "./routes/pets/pet-routes";
import articleRoute from "./routes/article/article-route";
import articleCatRoute from "./routes/article/category-route";
import petCategoryRoute from "./routes/pets/category-routes";
import adoptionRoute from "./routes/adoption/adoption-route";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import shopRoute from "./routes/shop/shop-route";
import sosRoute from "./routes/sos/sos-route";
import donationRoute from "./routes/donation/donation-route";
import cartRoute from "./routes/shop/cart-route";
import wishlistRoute from "./routes/shop/wishlist-route";
import Stripe from "stripe";
import DonationTransaction from "./models/transaction.model";
import Donations from "./models/donation.model";

dotenv.config();

//express application obj uusgeh
const app = express();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL || "";

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    // const event = stripe.
    let event: Stripe.Event;
    const sig = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig!,
        "whsec_2868aeaa993615336ab7badcb11f26c6969370ca23ea44b9f7f4edcd23d330f0"
      );
      console.log("event", event);
    } catch (err) {
      // On error, log and return the error message
      console.log(`❌ Error message: {err.message}`);
      res.status(400).send(`Webhook Error: {err.message}`);
      return;
    }

    // Successfully constructed event
    console.log("✅ Success:", event.id);

    // Cast event data to Stripe object
    if (event.type === "payment_intent.succeeded") {
      const stripeObject: Stripe.PaymentIntent = event.data
        .object as Stripe.PaymentIntent;
      console.log(`💰 PaymentIntent status: ${stripeObject.metadata}`);
    } else if (event.type === "charge.succeeded") {
      const charge = event.data.object as Stripe.Charge;
      console.log(`💵 Charge id: ${charge.id}`);
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  }
);

//middlewares
app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/pets", petRoute);
app.use("/api/v1/pets/category", petCategoryRoute);
app.use("/api/v1/sos", sosRoute);
app.use("/api/v1/articles", articleRoute);
app.use("/api/v1/articlesCat", articleCatRoute);
app.use("/api/v1/adoption", adoptionRoute);
app.use("/api/v1/products", shopRoute);
app.use("/api/v1/products/categories", shopRoute);
app.use("/api/v1/sos", sosRoute);
app.use("/api/v1/donation", donationRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/wishlist", wishlistRoute);

// test stripe
const stripe = new Stripe(
  "sk_test_51QFT20FG0rSCc90h6WziJAOOndtuauhRmLYnTN1iHbelFRCGyrOHxr6fYrXaJObOhEEEzZIMuQZFjYttq4E7QfbU00FW37ODTT"
);

app.post("/checkout", async (req: Request, res: Response) => {
  const {
    description,
    amount,
    donationId,
    userName,
    status = "pending",
    paymentMethod = "card",
    transactionNumber = Date.now().toString(),
  } = req.body;

  try {
    const donation = await Donations.findById(donationId);

    if (!donation) {
      return res.status(404).json({ message: "Donation post not found" });
    }
    donation.collectedDonations.push({
      transactionNumber,
      amount,
      status,
      paymentMethod,
      description,
      userName,
    });
    const updatedDonation = await donation.save();

    const session = await stripe.checkout.sessions.create({
      // metadata: {
      //   donationId,
      // },
      line_items: [
        {
          price_data: {
            product_data: {
              name: "Donation",
              metadata: {
                donationId,
              },
              description: description,
              // images: [
              //   "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nfGVufDB8fDB8fHww",
              // ],
            },
            unit_amount: amount * 100,
            currency: "usd",
          },
          quantity: 1,
        },
        // {
        //   price_data: {
        //     product_data: {
        //       name: "Donation",
        //       description: description,
        //       // images: [
        //       //   "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nfGVufDB8fDB8fHww",
        //       // ],
        //     },
        //     unit_amount: amount * 100,
        //     currency: "usd",
        //   },

        //   quantity: 1,
        // },
      ],
      mode: "payment",
      success_url: `https://pawchig-frontend.vercel.app/success`,
      cancel_url: `https://pawchig-frontend.vercel.app/cancel`,
    });

    // Send only ONE response
    return res.status(200).json({
      paymentUrl: session.url,
      updatedDonation,
    });
  } catch (error) {
    // Always send an error response
    return res.status(500).json({
      message: "Failed to create checkout session",
      error,
    });
  }
});

connectDB(MONGO_URL);
console.log("MONGO_URL", MONGO_URL);

app.listen(PORT, () => {
  console.log(`Server started at localhost:${PORT}`);
});
