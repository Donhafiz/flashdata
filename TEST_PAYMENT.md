# Testing Paystack Payment Integration

## Quick Test Guide

### 1. Setup Paystack Account

1. Go to https://paystack.com
2. Sign up for a free account
3. Verify your email
4. Get your test API keys from Settings → API Keys

### 2. Update .env File

```env
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxx
PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
```

### 3. Test Payment Flow

#### Step 1: Login to FlashData
- Email: iddrisuhafiz568@gmail.com
- Password: admin123

#### Step 2: Go to Dashboard
- Click "Top Up Wallet" button

#### Step 3: Enter Amount
- Enter any amount (minimum GH₵ 1)
- Example: 100

#### Step 4: Complete Payment
Paystack popup will appear. Use these test cards:

**✅ Successful Payment:**
```
Card Number: 4084 0840 8408 4081
CVV: 408
Expiry: 12/25 (any future date)
PIN: 0000
OTP: 123456
```

**❌ Failed Payment (for testing):**
```
Card Number: 5060 6666 6666 6666 666
CVV: 123
Expiry: 12/25
```

**⏳ Timeout (for testing):**
```
Card Number: 5078 5078 5078 5078 12
CVV: 123
Expiry: 12/25
```

#### Step 5: Verify
- After successful payment, wallet balance updates automatically
- Check transaction history
- Transaction record is created

## Payment Features

✅ **Paystack Popup Integration** - Modern inline payment
✅ **Real-time Verification** - Instant wallet update
✅ **Duplicate Prevention** - No double charging
✅ **Transaction Logging** - Complete audit trail
✅ **Webhook Support** - Automatic payment processing
✅ **Error Handling** - User-friendly error messages
✅ **Security** - Backend verification only

## Webhook Setup (Optional)

For production, set up webhook:

1. Go to Paystack Dashboard → Settings → Webhooks
2. Add webhook URL: `https://yourdomain.com/api/payment/webhook`
3. Webhook will auto-process payments even if user closes browser

## Currency Support

Default: **GHS (Ghana Cedis)**

Supported currencies:
- GHS - Ghana Cedis
- NGN - Nigerian Naira
- USD - US Dollars
- ZAR - South African Rand
- KES - Kenyan Shilling

## Minimum/Maximum Amounts

- Minimum: GH₵ 1
- Maximum: No limit (Paystack handles limits)

## Payment Flow Diagram

```
User Dashboard
    ↓
Click "Top Up Wallet"
    ↓
Enter Amount
    ↓
Click "Pay with Paystack"
    ↓
Paystack Popup Opens
    ↓
Enter Card Details
    ↓
Complete 3D Secure (if required)
    ↓
Payment Processing
    ↓
Backend Verification
    ↓
Wallet Updated
    ↓
Transaction Recorded
    ↓
Success Message
    ↓
Dashboard Refreshed
```

## Troubleshooting

### "Payment initialization failed"
- Check if Paystack keys are correct in .env
- Ensure keys match environment (test/live)
- Verify amount is valid (≥ 1)

### "Payment verification failed"
- Check internet connection
- Verify payment was successful in Paystack dashboard
- Check server logs for errors

### Wallet not updated
- Check if transaction exists in database
- Verify webhook is configured
- Check for duplicate reference numbers

## Production Checklist

Before going live:

- [ ] Replace test keys with live keys
- [ ] Set up webhook URL
- [ ] Test with real card (small amount)
- [ ] Enable HTTPS
- [ ] Set up proper error logging
- [ ] Configure email notifications
- [ ] Test refund process
- [ ] Set up monitoring

## Support

Paystack Support:
- Email: support@paystack.com
- Docs: https://paystack.com/docs
- Phone: +234 1 888 3888

FlashData Support:
- Email: support@flashdata.com
