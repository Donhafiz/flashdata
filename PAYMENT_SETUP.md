# Paystack Payment Integration Setup

## Step 1: Get Paystack API Keys

1. Go to [Paystack Dashboard](https://dashboard.paystack.com/)
2. Sign up or login
3. Navigate to **Settings** → **API Keys & Webhooks**
4. Copy your **Public Key** and **Secret Key**

## Step 2: Update Environment Variables

Update your `.env` file with your Paystack keys:

```env
PAYSTACK_SECRET_KEY=sk_test_your_secret_key_here
PAYSTACK_PUBLIC_KEY=pk_test_your_public_key_here
```

For production, use live keys:
```env
PAYSTACK_SECRET_KEY=sk_live_your_secret_key_here
PAYSTACK_PUBLIC_KEY=pk_live_your_public_key_here
```

## Step 3: Configure Webhook (Optional but Recommended)

1. In Paystack Dashboard, go to **Settings** → **API Keys & Webhooks**
2. Click on **Webhooks**
3. Add your webhook URL: `https://yourdomain.com/api/payment/webhook`
4. The webhook will automatically process successful payments

## Step 4: Test Payment Flow

### Test Cards (Paystack Test Mode)

**Successful Payment:**
- Card Number: `4084084084084081`
- CVV: `408`
- Expiry: Any future date
- PIN: `0000`
- OTP: `123456`

**Failed Payment:**
- Card Number: `5060666666666666666`
- CVV: Any 3 digits
- Expiry: Any future date

### Testing Steps:

1. Login to your account
2. Go to Dashboard
3. Click "Top Up Wallet"
4. Enter amount (minimum GH₵ 1)
5. Click "Pay with Paystack"
6. Use test card details above
7. Complete payment
8. Wallet should be credited automatically

## Payment Flow

```
User → Dashboard → Top Up Modal → Paystack Popup
                                        ↓
                                  Enter Card Details
                                        ↓
                                  Payment Success
                                        ↓
                              Verify Payment (Backend)
                                        ↓
                              Update Wallet Balance
                                        ↓
                              Create Transaction Record
                                        ↓
                              Redirect to Dashboard
```

## Features Implemented

✅ Paystack Popup Integration
✅ Payment Initialization
✅ Payment Verification
✅ Webhook Support
✅ Transaction Logging
✅ Duplicate Payment Prevention
✅ User Wallet Update
✅ Real-time Balance Update
✅ Error Handling
✅ Security Checks

## Currency

The system uses **GHS (Ghana Cedis)** by default.

To change currency, update the payment initialization:
```javascript
currency: 'NGN', // For Nigerian Naira
currency: 'USD', // For US Dollars
currency: 'ZAR', // For South African Rand
```

## Security Notes

1. **Never expose your Secret Key** in frontend code
2. Always verify payments on the backend
3. Use HTTPS in production
4. Validate webhook signatures
5. Check for duplicate transactions
6. Verify user ownership of payments

## Troubleshooting

### Payment not reflecting in wallet?
- Check if payment was successful in Paystack Dashboard
- Verify the reference number
- Check transaction logs in database
- Ensure webhook is configured correctly

### "Payment initialization failed"?
- Verify Paystack keys are correct
- Check if keys are for the right environment (test/live)
- Ensure amount is valid (minimum 1)
- Check API connection

### Webhook not working?
- Ensure webhook URL is publicly accessible
- Verify webhook signature validation
- Check server logs for errors
- Test webhook using Paystack Dashboard

## Support

For Paystack-specific issues, contact:
- Email: support@paystack.com
- Docs: https://paystack.com/docs

For FlashData issues, contact:
- Email: support@flashdata.com
