'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense, useMemo } from 'react';
import Image from 'next/image';
import Header from '../../components/Header';
import { MdFlight, MdArrowForward, MdAirlineSeatReclineNormal, MdLuggage, MdArrowBack, MdSort, MdCurrencyExchange } from 'react-icons/md';

// Currency conversion rate (approximate)
const USD_TO_INR = 84.5;

interface Flight {
  departure_airport: {
    name: string;
    id: string;
    time: string;
  };
  arrival_airport: {
    name: string;
    id: string;
    time: string;
  };
  duration: number;
  airplane: string;
  airline: string;
  airline_logo: string;
  travel_class: string;
  flight_number: string;
  extensions?: string[];
  legroom?: string;
}

interface Layover {
  duration: number;
  name: string;
  id: string;
  overnight?: boolean;
}

interface FlightResult {
  flights: Flight[];
  layovers?: Layover[];
  total_duration: number;
  carbon_emissions?: {
    this_flight: number;
    typical_for_this_route: number;
    difference_percent: number;
  };
  price: number;
  type: string;
  airline_logo?: string;
  extensions?: string[];
  departure_token?: string;
  booking_token?: string;
}

interface SearchResults {
  best_flights?: FlightResult[];
  other_flights?: FlightResult[];
  price_insights?: {
    lowest_price: number;
    price_level: string;
    typical_price_range: number[];
  };
  airports?: Array<{
    departure: Array<{
      airport: { name: string; id: string };
      city: string;
      country: string;
    }>;
    arrival: Array<{
      airport: { name: string; id: string };
      city: string;
      country: string;
    }>;
  }>;
  error?: string;
}

type Currency = 'USD' | 'INR';
type SortOption = 'price' | 'duration' | 'departure';

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

function formatTime(timeString: string): string {
  if (timeString.includes(' ')) {
    return timeString.split(' ')[1];
  }
  return timeString;
}

function formatPrice(price: number, currency: Currency): string {
  if (currency === 'INR') {
    const inrPrice = Math.round(price * USD_TO_INR);
    return `₹${inrPrice.toLocaleString('en-IN')}`;
  }
  return `$${price.toLocaleString('en-US')}`;
}

function FlightCard({ 
  result, 
  currency 
}: { 
  result: FlightResult; 
  currency: Currency;
}) {
  const firstFlight = result.flights[0];
  const lastFlight = result.flights[result.flights.length - 1];
  const stops = result.flights.length - 1;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Airline Info */}
        <div className="flex items-center gap-4 min-w-[200px]">
          <div className="w-12 h-12 relative flex-shrink-0 bg-gray-50 rounded-lg p-2">
            {(result.airline_logo || firstFlight.airline_logo) ? (
              <Image
                src={result.airline_logo || firstFlight.airline_logo}
                alt={firstFlight.airline}
                fill
                className="object-contain"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <MdFlight className="text-2xl text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{firstFlight.airline}</p>
            <p className="text-sm text-gray-500">{firstFlight.flight_number}</p>
          </div>
        </div>

        {/* Flight Route */}
        <div className="flex items-center gap-4 flex-1 justify-center min-w-[300px]">
          {/* Departure */}
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{formatTime(firstFlight.departure_airport.time)}</p>
            <p className="text-sm font-medium text-gray-600">{firstFlight.departure_airport.id}</p>
          </div>

          {/* Flight Path Visual */}
          <div className="flex flex-col items-center flex-1 px-4">
            <p className="text-sm text-gray-500 mb-1">{formatDuration(result.total_duration)}</p>
            <div className="flex items-center w-full">
              <div className="w-2 h-2 rounded-full bg-genius-500"></div>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-genius-500 to-genius-400 relative">
                {stops > 0 && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-3 h-3 rounded-full bg-orange-400 border-2 border-white"></div>
                  </div>
                )}
              </div>
              <MdFlight className="text-genius-500 rotate-90 -ml-1" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {stops === 0 ? 'Nonstop' : `${stops} stop${stops > 1 ? 's' : ''}`}
              {result.layovers && result.layovers[0] && ` · ${result.layovers[0].id}`}
            </p>
          </div>

          {/* Arrival */}
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{formatTime(lastFlight.arrival_airport.time)}</p>
            <p className="text-sm font-medium text-gray-600">{lastFlight.arrival_airport.id}</p>
          </div>
        </div>

        {/* Price and Book */}
        <div className="text-right min-w-[150px]">
          <p className="text-3xl font-bold text-genius-600">{formatPrice(result.price, currency)}</p>
          <p className="text-sm text-gray-500 mb-2">per person</p>
          <button className="px-6 py-2 bg-genius-500 hover:bg-genius-400 text-white rounded-lg font-medium transition-colors">
            Select
          </button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-4 text-sm text-gray-600">
        {firstFlight.travel_class && (
          <div className="flex items-center gap-1">
            <MdAirlineSeatReclineNormal className="text-gray-400" />
            <span>{firstFlight.travel_class}</span>
          </div>
        )}
        {firstFlight.legroom && (
          <div className="flex items-center gap-1">
            <span>{firstFlight.legroom} legroom</span>
          </div>
        )}
        {firstFlight.extensions && firstFlight.extensions.slice(0, 3).map((ext, i) => (
          <div key={i} className="flex items-center gap-1">
            <MdLuggage className="text-gray-400" />
            <span>{ext}</span>
          </div>
        ))}
        {result.carbon_emissions && (
          <div className={`flex items-center gap-1 ${result.carbon_emissions.difference_percent < 0 ? 'text-green-600' : 'text-gray-600'}`}>
            <span>
              {result.carbon_emissions.difference_percent < 0 
                ? `${Math.abs(result.carbon_emissions.difference_percent)}% less CO₂`
                : `${result.carbon_emissions.difference_percent}% more CO₂`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// Currency Toggle Component
function CurrencyToggle({ 
  currency, 
  onToggle 
}: { 
  currency: Currency; 
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <MdCurrencyExchange className="text-genius-500" />
      <div className="flex items-center">
        <span className={`px-2 py-1 rounded text-sm font-medium transition-colors ${currency === 'USD' ? 'bg-genius-500 text-white' : 'text-gray-600'}`}>
          USD
        </span>
        <span className={`px-2 py-1 rounded text-sm font-medium transition-colors ${currency === 'INR' ? 'bg-genius-500 text-white' : 'text-gray-600'}`}>
          INR
        </span>
      </div>
    </button>
  );
}

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<SearchResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('price');
  const [currency, setCurrency] = useState<Currency>('USD');

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      setError(null);

      try {
        const tripType = searchParams.get('tripType') || 'roundtrip';
        const from = searchParams.get('from') || '';
        const to = searchParams.get('to') || '';
        const departureDate = searchParams.get('departureDate') || '';
        const returnDate = searchParams.get('returnDate') || '';
        const cabinClass = searchParams.get('cabinClass') || 'economy';
        const adults = parseInt(searchParams.get('adults') || '1');
        const children = parseInt(searchParams.get('children') || '0');
        const infants = parseInt(searchParams.get('infants') || '0');
        const multiCityFlightsParam = searchParams.get('multiCityFlights');

        let multiCityFlights = null;
        if (multiCityFlightsParam) {
          try {
            multiCityFlights = JSON.parse(decodeURIComponent(multiCityFlightsParam));
          } catch (e) {
            console.error('Error parsing multi-city flights:', e);
          }
        }

        const response = await fetch('/api/flights', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tripType,
            from,
            to,
            departureDate,
            returnDate,
            cabinClass,
            passengers: { adults, children, infants },
            multiCityFlights,
          }),
        });

        const data = await response.json();

        if (data.error) {
          setError(data.error);
        } else {
          setResults(data);
        }
      } catch (err) {
        console.error('Error fetching flights:', err);
        setError('Failed to fetch flight results. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [searchParams]);

  // Combine and sort all flights
  const sortedFlights = useMemo(() => {
    const allFlights = [
      ...(results?.best_flights || []),
      ...(results?.other_flights || []),
    ];

    return [...allFlights].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'duration':
          return a.total_duration - b.total_duration;
        case 'departure':
          const timeA = a.flights[0]?.departure_airport?.time || '';
          const timeB = b.flights[0]?.departure_airport?.time || '';
          return timeA.localeCompare(timeB);
        default:
          return 0;
      }
    });
  }, [results, sortBy]);

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'USD' ? 'INR' : 'USD');
  };

  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const departureDate = searchParams.get('departureDate') || '';

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      {/* Search Summary Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <MdArrowBack />
              <span>Modify Search</span>
            </button>
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-900">
                {from.toUpperCase()} <MdArrowForward className="inline mx-2" /> {to.toUpperCase()}
              </h1>
              <span className="text-gray-500">|</span>
              <span className="text-gray-600">{departureDate}</span>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-genius-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg text-gray-600">Searching for the best flights...</p>
            <p className="text-sm text-gray-400 mt-2">This may take a few moments</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
            <h2 className="text-xl font-semibold text-red-700 mb-2">Unable to Find Flights</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2 bg-genius-500 hover:bg-genius-400 text-white rounded-lg font-medium transition-colors"
            >
              Try Another Search
            </button>
          </div>
        ) : sortedFlights.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <MdFlight className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No Flights Found</h2>
            <p className="text-gray-500 mb-4">We couldn&apos;t find any flights matching your criteria. Try adjusting your dates or destinations.</p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2 bg-genius-500 hover:bg-genius-400 text-white rounded-lg font-medium transition-colors"
            >
              Modify Search
            </button>
          </div>
        ) : (
          <>
            {/* Results Header with Sort and Currency Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {sortedFlights.length} Flight{sortedFlights.length !== 1 ? 's' : ''} Found
                </h2>
                {results?.price_insights && (
                  <p className="text-sm text-gray-500 mt-1">
                    Prices are currently <span className={results.price_insights.price_level === 'low' ? 'text-green-600 font-medium' : 'text-gray-600'}>{results.price_insights.price_level}</span>
                    {results.price_insights.typical_price_range && (
                      <> · Typical price: {formatPrice(results.price_insights.typical_price_range[0], currency)} - {formatPrice(results.price_insights.typical_price_range[1], currency)}</>
                    )}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4">
                {/* Currency Toggle */}
                <CurrencyToggle currency={currency} onToggle={toggleCurrency} />
                
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <MdSort className="text-gray-500" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-genius-500 bg-white cursor-pointer"
                  >
                    <option value="price">Sort by Price</option>
                    <option value="duration">Sort by Duration</option>
                    <option value="departure">Sort by Departure</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Sorted Flight Results */}
            <div className="space-y-4">
              {sortedFlights.map((result, index) => (
                <FlightCard 
                  key={`flight-${index}`} 
                  result={result} 
                  currency={currency}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-genius-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}
