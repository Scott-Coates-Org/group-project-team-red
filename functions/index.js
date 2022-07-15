/* eslint-disable no-undef */
const functions = require('firebase-functions')
const admin = require('firebase-admin')

/* eslint-disable no-debugger */
const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config() // Uncomment this for localhost
admin.initializeApp()

// This is your test secret API key.
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY) // Uncomment dotenv above to make it work on localhost and place the variable on .env file, .env.local doesn't work

// Automatically allow cross-origin requests
app.use(express.static('build'))
app.use(express.json())
// app.use(cors())
// Automatically allow cross-origin requests
app.use(cors({ origin: true }))

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400
}
// var corsOptions = {
//   'Access-Control-Allow-Origin': 'https://team-red-1ccfb.web.app',
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

app.get('/create-payment-intent', function (req, res, next) {
  res.json({ msg: "I'm a teapot!" })
})

app.post('/create-payment-intent', async (req, res) => {
  const { items } = req.body

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
    // payment_method_types: ['card'],
  })

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  })
})

app.listen(4242, () => console.log('Node server listening on port 4242!'))

exports.stripe = functions.https.onRequest(app)

// const functions = require('firebase-functions')
// const admin = require('firebase-admin')

// admin.initializeApp()

// exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
//   const paymentIntent = await stripe.paymentIntents.create({
//     // amount: calculateOrderAmount(items),
//     amount: 1400,
//     currency: 'usd',
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   })

//   return {
//     clientSecret: paymentIntent.client_secret,
//   }
// })

// exports.createStripeCheckout = functions.https.onCall(async (data, context) => {
//   const stripe = require('stripe')(functions.config().stripe.secret_key)
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     mode: 'payment',
//     success_url: 'http://localhost:5000/thankyou',
//     cancel_url: 'http://localhost:5000/home', // TODO: Make a proper cancel url
//     // success_url: 'https://team-red-1ccfb.web.app/thankyou',
//     // cancel_url: 'https://team-red-1ccfb.web.app/home', // TODO: Make a proper cancel url
//     shipping_address_collection: {
//       allowed_countries: ['US'],
//     },
//     line_items: [
//       {
//         quantity: 1,
//         price_data: {
//           currency: 'usd',
//           unit_amount: 100 * 100, // 10000 = 100USD
//           product_data: {
//             name: 'Power Pass',
//           },
//         },
//       },
//     ],
//   })
//   console.log('session', session)
//   return session
// })

// exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
//   const stripe = require('stripe')(functions.config().stripe.secret_key)
//   let event

//   try {
//     const whSec = functions.config().stripe.payments_webhook_secret

//     event = stripe.webhooks.constructEvent(
//       req.rawBody,
//       req.headers['stripe-signature'],
//       whSec
//     )
//   } catch (err) {
//     console.error('Webhook signature verification failed')
//     res.sendStatus(400)
//   }

//   const dataObject = event.data.object

//   await admin.firestore().collection('orders').doc().set({
//     // TODO: Check setup for production db
//     checkoutSessionId: dataObject.id,
//     paymentStatus: dataObject.payment_status,
//     shippingInfo: dataObject.shipping,
//     amountTotal: dataObject.amount_total,
//   })
// })
