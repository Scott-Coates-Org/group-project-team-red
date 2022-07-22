const functions = require('firebase-functions')

const express = require('express')
const cors = require('cors')
const app = express()

// This is your test secret API key.
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY) // Uncomment dotenv above to make it work on localhost and place the variable on .env file, .env.local doesn't work

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

const calculateOrderAmount = (orderDetails) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  // TODO: V2 Change name for ID
  // TODO: V2 priceList should not be hardcoded, it should fetch products and addOns from db
  const priceList = {
    'Unlimited Pass': 25,
    'Power Pass': 21,
    'Junior Jumpers': 15,
    'Toddler Socks': 3.5,
  }

  const subTotal = orderDetails.productName.reduce(
    (previousValue, currentItem) => {
      if (Object.prototype.hasOwnProperty.call(priceList, currentItem)) {
        if (currentItem === 'Unlimited Pass' || currentItem === 'Power Pass') {
          return (
            previousValue + priceList[currentItem] * orderDetails.ticketsCount
          )
        }
        if (currentItem === 'Toddler Socks') {
          return (
            previousValue + priceList[currentItem] * orderDetails.addOnsCount
          )
        }
      }
    },
    0
  )

  const calculateTax = Math.round(subTotal * 0.07 * 100) / 100
  const total = (subTotal + calculateTax) * 100
  // The amount has to be defined in cents
  return total
}

app.post('/create-payment-intent', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  const { items } = req.body

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
    receipt_email: 'jojawhi@gmail.com',
  })

  res.status(200).send({
    paymentIntent,
  })
})

exports.stripe = functions.https.onRequest(app)
