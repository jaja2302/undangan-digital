# Setup Instructions for RSVP API

## Problem

The RSVP functionality works locally but fails on Vercel with "Failed to save data" error because Vercel's serverless functions have a read-only filesystem.

## Solution

I've updated the RSVP API to use JSONBin.io as external storage instead of local file system.

## Setup Steps

### 1. Create JSONBin.io Account

1. Go to https://jsonbin.io/
2. Sign up for a free account
3. Create a new bin

### 2. Get Your Credentials

1. Copy your API key from the dashboard
2. Copy your bin ID from the bin URL

### 3. Set Environment Variables

Create a `.env.local` file in your project root with:

```
JSONBIN_API_KEY=your-actual-api-key
JSONBIN_BIN_ID=your-actual-bin-id
```

### 4. Deploy to Vercel

1. Add the same environment variables in your Vercel dashboard
2. Go to your project settings → Environment Variables
3. Add:
   - `JSONBIN_API_KEY` = your API key
   - `JSONBIN_BIN_ID` = your bin ID

### 5. Initialize the Bin

The first time you use the API, it will automatically create the initial structure:

```json
{
  "attendees": [],
  "ipRecords": []
}
```

## Testing

After setup, your RSVP form should work correctly on Vercel deployment.

## Benefits

- ✅ Works on Vercel serverless functions
- ✅ Free tier available
- ✅ No database setup required
- ✅ Automatic backup and versioning
- ✅ Rate limiting still works
