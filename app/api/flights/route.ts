import { NextRequest, NextResponse } from 'next/server';

const SERPAPI_KEY = process.env.SERPAPI_KEY;

// Airport code mapping for common airports
const AIRPORT_CODES: { [key: string]: string } = {
  // US Airports
  'jfk': 'JFK',
  'john f kennedy': 'JFK',
  'new york': 'JFK',
  'lax': 'LAX',
  'los angeles': 'LAX',
  'hnl': 'HNL',
  'honolulu': 'HNL',
  'hawaii': 'HNL',
  'state college': 'SCE',
  'sce': 'SCE',
  
  // International Airports
  'cancun': 'CUN',
  'cun': 'CUN',
  'jnb': 'JNB',
  'johannesburg': 'JNB',
  'cpt': 'CPT',
  'cape town': 'CPT',
  'cdg': 'CDG',
  'paris': 'CDG',
  'charles de gaulle': 'CDG',
  'yul': 'YUL',
  'montreal': 'YUL',
  'nrt': 'NRT',
  'tokyo': 'NRT',
  'narita': 'NRT',
  'fco': 'FCO',
  'rome': 'FCO',
  'fiumicino': 'FCO',
  'mxp': 'MXP',
  'milan': 'MXP',
  'malpensa': 'MXP',
  'lhr': 'LHR',
  'london': 'LHR',
  'heathrow': 'LHR',
  'bcn': 'BCN',
  'barcelona': 'BCN',
};

function resolveAirportCode(input: string): string {
  const lowered = input.toLowerCase().trim();
  
  // If it's already a valid 3-letter code, return uppercase
  if (/^[a-zA-Z]{3}$/.test(input.trim())) {
    return input.trim().toUpperCase();
  }
  
  // Check mapping
  return AIRPORT_CODES[lowered] || input.trim().toUpperCase();
}

interface FlightSearchParams {
  departure_id: string;
  arrival_id: string;
  outbound_date: string;
  return_date?: string;
  type: number; // 1: Round trip, 2: One way, 3: Multi-city
  travel_class: number; // 1: Economy, 2: Premium economy, 3: Business, 4: First
  adults: number;
  children: number;
  infants_in_seat: number;
  currency?: string;
  hl?: string;
  gl?: string;
}

interface MultiCityFlight {
  departure_id: string;
  arrival_id: string;
  date: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!SERPAPI_KEY) {
      return NextResponse.json(
        { error: 'API key not configured. Please set SERPAPI_KEY environment variable.' },
        { status: 500 }
      );
    }

    const {
      tripType,
      from,
      to,
      departureDate,
      returnDate,
      cabinClass,
      passengers,
      multiCityFlights,
    } = body;

    // Map cabin class to API value
    const travelClassMap: { [key: string]: number } = {
      'economy': 1,
      'premium-economy': 2,
      'business': 3,
      'first': 4,
    };

    // Build the API request URL
    const baseUrl = 'https://serpapi.com/search.json';
    const params = new URLSearchParams();
    
    params.append('engine', 'google_flights');
    params.append('api_key', SERPAPI_KEY);
    params.append('currency', 'USD');
    params.append('hl', 'en');
    params.append('gl', 'us');

    if (tripType === 'multicity' && multiCityFlights && multiCityFlights.length > 0) {
      // Multi-city flight
      params.append('type', '3');
      
      const multiCityJson: MultiCityFlight[] = multiCityFlights.map((flight: { from: string; to: string; date: string }) => ({
        departure_id: resolveAirportCode(flight.from),
        arrival_id: resolveAirportCode(flight.to),
        date: flight.date,
      }));
      
      params.append('multi_city_json', JSON.stringify(multiCityJson));
    } else {
      // Round trip or One way
      params.append('type', tripType === 'roundtrip' ? '1' : '2');
      params.append('departure_id', resolveAirportCode(from));
      params.append('arrival_id', resolveAirportCode(to));
      params.append('outbound_date', departureDate);
      
      if (tripType === 'roundtrip' && returnDate) {
        params.append('return_date', returnDate);
      }
    }

    params.append('travel_class', String(travelClassMap[cabinClass] || 1));
    params.append('adults', String(passengers?.adults || 1));
    params.append('children', String(passengers?.children || 0));
    params.append('infants_in_seat', String(passengers?.infants || 0));

    const apiUrl = `${baseUrl}?${params.toString()}`;
    
    console.log('Fetching flights from:', apiUrl.replace(SERPAPI_KEY, '***'));

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.error) {
      return NextResponse.json(
        { error: data.error },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Flight search error:', error);
    return NextResponse.json(
      { error: 'Failed to search flights. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { message: 'Flight search API. Use POST method to search flights.' },
    { status: 200 }
  );
}
