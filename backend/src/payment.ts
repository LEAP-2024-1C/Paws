// import express, { Request, Response } from "express";
// import cors from "cors";
// import authRoute from "./routes/auth-route";
// import petRoute from "./routes/pets/pet-routes";
// import articleRoute from "./routes/article/article-route";
// import articleCatRoute from "./routes/article/category-route";
// import petCategoryRoute from "./routes/pets/category-routes";
// import adoptionRoute from "./routes/adoption/adoption-route";
// import dotenv from "dotenv";
// import { connectDB } from "./config/db";
// import shopRoute from "./routes/shop/shop-route";
// import sosRoute from "./routes/sos/sos-route";
// import donationRoute from "./routes/donation/donation-route";

// import cartRoute from "./routes/shop/cart-route";
// import wishlistRoute from "./routes/shop/wishlist-route";

// import Stripe from "stripe";
// import DonationTransaction from "./models/transaction.model";
// import Donations from "./models/donation.model";

// dotenv.config();

// //express application obj uusgeh
// const app = express();

// const PORT = process.env.PORT;
// const MONGO_URL = process.env.MONGO_URL || "";

// app.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   async (req: Request, res: Response) => {
//     // const event = stripe.
//     const sig = req.headers["stripe-signature"];
//     let event: Stripe.Event;

//     try {
//       event = stripe.webhooks.constructEvent(
//         req.body,
//         sig!,
//         "whsec_2868aeaa993615336ab7badcb11f26c6969370ca23ea44b9f7f4edcd23d330f0"
//       );
//       console.log("event", event);
//     } catch (err) {
//       // On error, log and return the error message
//       console.log(`❌ Error message: {err.message}`);
//       res.status(400).send(`Webhook Error: {err.message}`);
//       return;
//     }

//     // Successfully constructed event
//     console.log("✅ Success:", event.id);

//     // Cast event data to Stripe object
//     // if (event.type === "payment_intent.succeeded") {
//     //   const stripeObject: Stripe.PaymentIntent = event.data
//     //     .object as Stripe.PaymentIntent;
//     //   console.log(
//     //     `💰 PaymentIntent status: ${stripeObject.metadata.donationId}`
//     //   );
//     // }
//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object as Stripe.Checkout.Session;
//       const metadata = session.metadata!;
//       console.log("metadata", metadata);

//       try {
//         await DonationTransaction.findOneAndUpdate(
//           {
//             transactionNumber: metadata.transactionNumber,
//           },
//           { status: "completed" }
//         );
//         await Donations.findByIdAndUpdate(metadata.donationId, {});
//       } catch (error) {
//         console.error("Failed to update transaction:", error);
//       }
//     }
//     //  else if (event.type === "charge.succeeded") {
//     //   const charge = event.data.object as Stripe.Charge;
//     //   console.log(`💵 Charge id: ${charge.id}`);
//     // } else {
//     //   console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
//     // }

//     // Return a response to acknowledge receipt of the event
//     res.json({ received: true });
//   }
// );

// //middlewares
// app.use(express.json());
// app.use(cors());
// app.use("/api/v1/auth", authRoute);
// app.use("/api/v1/pets", petRoute);
// app.use("/api/v1/pets/category", petCategoryRoute);
// app.use("/api/v1/sos", sosRoute);
// app.use("/api/v1/articles", articleRoute);
// app.use("/api/v1/articlesCat", articleCatRoute);
// app.use("/api/v1/adoption", adoptionRoute);
// app.use("/api/v1/products", shopRoute);
// app.use("/api/v1/products/categories", shopRoute);
// app.use("/api/v1/sos", sosRoute);
// app.use("/api/v1/donation", donationRoute);
// app.use("/api/v1/cart", cartRoute);
// app.use("/api/v1/wishlist", wishlistRoute);

// // test stripe
// const stripe = new Stripe(
//   "sk_test_51QFT20FG0rSCc90h6WziJAOOndtuauhRmLYnTN1iHbelFRCGyrOHxr6fYrXaJObOhEEEzZIMuQZFjYttq4E7QfbU00FW37ODTT"
// );

// app.post("/checkout", async (req: Request, res: Response) => {
//   const {
//     description,
//     amount,
//     donationId,
//     userName,
//     status = "pending",
//     paymentMethod = "card",
//     transactionNumber = Date.now().toString(),
//   } = req.body;
//   try {
//     // const transaction = await DonationTransaction.create({
//     //   transactionNumber,
//     //   donationId,
//     //   amount,
//     //   status,
//     //   paymentMethod,
//     //   description,
//     //   userName,
//     // });
//     const session = await stripe.checkout.sessions.create({
//       // metadata: {
//       //   donationId,
//       // },
//       metadata: {
//         donationId,
//         transactionNumber,
//         status,
//         paymentMethod,
//       },
//       line_items: [
//         {
//           price_data: {
//             product_data: {
//               name: "Donation",
//               description: description,
//               // images: [
//               //   "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nfGVufDB8fDB8fHww",
//               // ],
//             },
//             unit_amount: amount * 100,
//             currency: "usd",
//           },

//           quantity: 1,
//         },
//         // {
//         //   price_data: {
//         //     product_data: {
//         //       name: "Donation",
//         //       description: description,
//         //       // images: [
//         //       //   "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nfGVufDB8fDB8fHww",
//         //       // ],
//         //     },
//         //     unit_amount: amount * 100,
//         //     currency: "usd",
//         //   },

//         //   quantity: 1,
//         // },
//       ],
//       mode: "payment",
//       success_url: `http://localhost:3000/success`,
//       cancel_url: `http://localhost:3000/cancel`,
//     });

//     res.json({ paymentUrl: session.url! });
//   } catch (error) {
//     console.error("Checkout error:", error);
//     res.status(500).json({ error: "Failed to create checkout session" });
//   }

//   // res.send("Success");
// });

// connectDB(MONGO_URL);
// console.log("MONGO_URL", MONGO_URL);

// app.listen(PORT, () => {
//   console.log(`Server started at localhost:${PORT}`);
// });
