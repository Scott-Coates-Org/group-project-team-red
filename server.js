/* eslint-disable no-debugger */
const express = require('express')
const cors = require('cors')
const app = express()
// require('dotenv').config() // Uncomment this for localhost

// This is your test secret API key.
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY) // Uncomment dotenv above to make it work on localhost and place the variable on .env file, .env.local doesn't work

app.use(express.static('public'))
app.use(express.json())
app.use(cors())
// const YOUR_DOMAIN = 'http://localhost:4242'

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400
}
var corsOptions = {
  origin: 'http://localhost:4242',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/create-payment-intent', cors(corsOptions), function (req, res, next) {
  res.json({ msg: 'This is CORS-enabled for all origins!' })
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

  res.send({
    clientSecret: paymentIntent.client_secret,
  })
})

app.listen(4242, () => console.log('Node server listening on port 4242!'))
