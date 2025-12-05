# Flight Genius ✈️

A modern flight search application built with Next.js that helps you find the best flight deals.

## Features

- 🔍 **Smart Flight Search** - Search for flights using SerpAPI's Google Flights integration
- 🌍 **Multiple Trip Types** - Support for Round Trip, One Way, and Multi-City flights
- 💺 **Cabin Class Selection** - Economy, Premium Economy, Business, and First Class
- 👥 **Passenger Management** - Add adults, children, and infants
- 🎨 **Beautiful UI** - Modern, responsive design with smooth animations

## Supported Routes

The application is optimized for the following routes:
- JFK ↔ Cancun (CUN)
- JFK ↔ Honolulu (HNL)
- LAX ↔ Honolulu (HNL)
- State College ↔ LAX
- JFK ↔ Johannesburg (JNB)
- JFK ↔ Cape Town (CPT)
- JFK ↔ Paris (CDG)
- Montreal (YUL) ↔ Paris (CDG)
- LAX ↔ Tokyo (NRT)
- LAX ↔ Rome (FCO)
- LAX ↔ Milan (MXP)
- LAX ↔ London (LHR)
- LAX ↔ Barcelona (BCN)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# SerpAPI Key for Google Flights API
# Get your API key from https://serpapi.com/
SERPAPI_KEY=your_serpapi_key_here
```

To get your SerpAPI key:
1. Go to [https://serpapi.com/](https://serpapi.com/)
2. Sign up for an account (free tier available)
3. Go to your dashboard and copy your API key
4. Paste it in the `.env.local` file

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Framework**: Next.js 16+
- **Styling**: Tailwind CSS
- **Flight Data**: SerpAPI Google Flights API
- **Icons**: React Icons

## Project Structure

```
flight_genius/
├── app/
│   ├── api/
│   │   └── flights/
│   │       └── route.ts    # API route for flight search
│   ├── search/
│   │   └── page.tsx        # Search results page
│   ├── page.tsx            # Home page with search form
│   └── globals.css         # Global styles
├── components/
│   └── Header.tsx          # Header component
└── public/                 # Static assets
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Make sure to add your `SERPAPI_KEY` environment variable in the Vercel project settings.

