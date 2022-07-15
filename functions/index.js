/* eslint-disable no-undef */
const functions = require('firebase-functions')
const admin = require('firebase-admin')

/* eslint-disable no-debugger */
const express = require('express')
const cors = require('cors')
const app = express()
// require('dotenv').config() // Uncomment this for localhost
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
