'use client';

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdFlight, MdLocationOn, MdCalendarToday, MdPeople, MdSearch, MdAdd } from "react-icons/md";
import Header from "../components/Header";
import { useToast } from "../components/Toaster";

interface FlightSegment {
  id: number;
  from: string;
  to: string;
  date: string;
}

export default function Home() {
  const router = useRouter();
  const { toast } = useToast();
  const [tripType, setTripType] = useState<'roundtrip' | 'oneway' | 'multicity'>('roundtrip');
  const [cabinClass, setCabinClass] = useState('economy');
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });
  const [showPassengers, setShowPassengers] = useState(false);
  
  // Form state for single trip
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  
  // Multi-city state
  const [flightSegments, setFlightSegments] = useState<FlightSegment[]>([
    { id: 1, from: '', to: '', date: '' },
    { id: 2, from: '', to: '', date: '' }
  ]);

  const [isSearching, setIsSearching] = useState(false);

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  const addFlightSegment = () => {
    const newId = Math.max(...flightSegments.map(s => s.id)) + 1;
    setFlightSegments([...flightSegments, { id: newId, from: '', to: '', date: '' }]);
  };

  const removeFlightSegment = (id: number) => {
    if (flightSegments.length > 2) {
      setFlightSegments(flightSegments.filter(s => s.id !== id));
    }
  };

  const updateFlightSegment = (id: number, field: 'from' | 'to' | 'date', value: string) => {
    setFlightSegments(flightSegments.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const handleSearch = () => {
    setIsSearching(true);

    // Build query parameters
    const params = new URLSearchParams();
    params.append('tripType', tripType);
    params.append('cabinClass', cabinClass);
    params.append('adults', String(passengers.adults));
    params.append('children', String(passengers.children));
    params.append('infants', String(passengers.infants));

    if (tripType === 'multicity') {
      // Validate multi-city flights
      const validFlights = flightSegments.filter(s => s.from && s.to && s.date);
      if (validFlights.length < 2) {
        toast('Please fill in at least 2 flight segments for multi-city search.');
        setIsSearching(false);
        return;
      }
      params.append('multiCityFlights', encodeURIComponent(JSON.stringify(validFlights)));
    } else {
      // Validate single trip
      if (!from || !to || !departureDate) {
        toast('Please fill in all required fields (From, To, and Departure Date).');
        setIsSearching(false);
        return;
      }
      if (tripType === 'roundtrip' && !returnDate) {
        toast('Please select a return date for round trip.');
        setIsSearching(false);
        return;
      }
      
      params.append('from', from);
      params.append('to', to);
      params.append('departureDate', departureDate);
      if (returnDate) {
        params.append('returnDate', returnDate);
      }
    }

    // Navigate to search results page
    router.push(`/search?${params.toString()}`);
  };

  // Popular routes for quick selection
  const popularRoutes = [
    { from: 'JFK', to: 'CUN', label: 'New York → Cancun' },
    { from: 'JFK', to: 'HNL', label: 'New York → Honolulu' },
    { from: 'LAX', to: 'HNL', label: 'Los Angeles → Honolulu' },
    { from: 'JFK', to: 'CDG', label: 'New York → Paris' },
    { from: 'LAX', to: 'NRT', label: 'Los Angeles → Tokyo' },
    { from: 'LAX', to: 'LHR', label: 'Los Angeles → London' },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section with Background Image */}
      <div className="relative pb-24">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={`/hero-bg.avif`}
            alt="Flight Hero Background"
            fill 
            className="object-cover"
            priority
            unoptimized
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Header Component */}
        <Header />

        {/* Hero Title */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-4 pb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-semibold text-white mb-4 drop-shadow-lg">
              Where to next?
            </h1>
            <p className="text-xl text-white/90">
              Find the best flight deals tailored just for you
            </p>
          </div>
        </div>
      </div>

      {/* Search Form Card (overlapping, half on black, half on white) */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 -mt-16 pb-16">
        <div className="bg-white rounded-2xl p-6 md:p-8 max-w-full mx-auto relative shadow-xl">
          {/* Trip Type Tabs and Cabin Class */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-300">
            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setTripType('roundtrip')}
                className={`px-6 py-2 rounded-md font-medium text-sm transition-all duration-200 cursor-pointer ${
                  tripType === 'roundtrip'
                    ? 'bg-genius-500 text-white'
                    : 'bg-gray-100 text-black'
                }`}
              >
                Round Trip
              </button>
              <button
                onClick={() => setTripType('oneway')}
                className={`px-6 py-2 rounded-md font-medium text-sm transition-all duration-200 cursor-pointer ${
                  tripType === 'oneway'
                    ? 'bg-genius-500 text-white'
                    : 'bg-gray-100 text-black'
                }`}
              >
                One Way
              </button>
              <button
                onClick={() => setTripType('multicity')}
                className={`px-6 py-2 rounded-md font-medium text-sm transition-all duration-200 cursor-pointer ${
                  tripType === 'multicity'
                    ? 'bg-genius-500 text-white'
                    : 'bg-gray-100 text-black'
                }`}
              >
                Multi-City
              </button>
            </div>

            {/* Cabin Class Dropdown */}
            <select
              value={cabinClass}
              onChange={(e) => setCabinClass(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-200 text-black bg-white cursor-pointer text-sm font-medium"
            >
              <option value="economy">Economy</option>
              <option value="premium-economy">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First Class</option>
            </select>
          </div>

          {/* Search Inputs */}
          {tripType !== 'multicity' ? (
            <div className="flex flex-wrap gap-4 mb-6">
              {/* From */}
              <div className="flex-1 min-w-[180px]">
                <label className="flex items-center gap-2 text-sm font-medium text-black mb-2">
                  <MdFlight className="text-base" />
                  Leaving from
                </label>
                <input
                  type="text"
                  placeholder="City or Airport (e.g., JFK, LAX)"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-all duration-200 text-black placeholder-black/50 text-sm focus:border-genius-500 focus:ring-2 focus:ring-genius-500/20"
                />
              </div>

              {/* To */}
              <div className="flex-1 min-w-[180px]">
                <label className="flex items-center gap-2 text-sm font-medium text-black mb-2">
                  <MdLocationOn className="text-base" />
                  Going to
                </label>
                <input
                  type="text"
                  placeholder="City or Airport (e.g., CUN, CDG)"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-all duration-200 text-black placeholder-black/50 text-sm focus:border-genius-500 focus:ring-2 focus:ring-genius-500/20"
                />
              </div>

              {/* Departing */}
              <div className="flex-1 min-w-[160px]">
                <label className="flex items-center gap-2 text-sm font-medium text-black mb-2">
                  <MdCalendarToday className="text-base" />
                  Departing
                </label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-all duration-200 text-black text-sm focus:border-genius-500 focus:ring-2 focus:ring-genius-500/20"
                />
              </div>

              {/* Returning (only for round trip) */}
              {tripType === 'roundtrip' && (
                <div className="flex-1 min-w-[160px]">
                  <label className="flex items-center gap-2 text-sm font-medium text-black mb-2">
                    <MdCalendarToday className="text-base" />
                    Returning
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={departureDate || new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-all duration-200 text-black text-sm focus:border-genius-500 focus:ring-2 focus:ring-genius-500/20"
                  />
                </div>
              )}

              {/* Passengers */}
              <div className="flex-1 min-w-[160px] relative">
                <label className="flex items-center gap-2 text-sm font-medium text-black mb-2">
                  <MdPeople className="text-base" />
                  Passenger(s)
                </label>
                <button
                  onClick={() => setShowPassengers(!showPassengers)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left outline-none transition-all duration-200 text-black hover:border-gray-400 text-sm cursor-pointer"
                >
                  {totalPassengers} Passenger{totalPassengers !== 1 ? 's' : ''}
                </button>

                {/* Passenger Dropdown */}
                {showPassengers && (
                  <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg p-4 z-20 shadow-lg">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-black font-medium text-sm">Adults</span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              setPassengers({
                                ...passengers,
                                adults: Math.max(1, passengers.adults - 1),
                              })
                            }
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-black font-bold transition-colors text-sm cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold text-black text-sm">
                            {passengers.adults}
                          </span>
                          <button
                            onClick={() =>
                              setPassengers({
                                ...passengers,
                                adults: passengers.adults + 1,
                              })
                            }
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-black font-bold transition-colors text-sm cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-black font-medium text-sm">Children</span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              setPassengers({
                                ...passengers,
                                children: Math.max(0, passengers.children - 1),
                              })
                            }
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-black font-bold transition-colors text-sm cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold text-black text-sm">
                            {passengers.children}
                          </span>
                          <button
                            onClick={() =>
                              setPassengers({
                                ...passengers,
                                children: passengers.children + 1,
                              })
                            }
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-black font-bold transition-colors text-sm cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-black font-medium text-sm">Infants</span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              setPassengers({
                                ...passengers,
                                infants: Math.max(0, passengers.infants - 1),
                              })
                            }
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-black font-bold transition-colors text-sm cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold text-black text-sm">
                            {passengers.infants}
                          </span>
                          <button
                            onClick={() =>
                              setPassengers({
                                ...passengers,
                                infants: passengers.infants + 1,
                              })
                            }
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-black font-bold transition-colors text-sm cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowPassengers(false)}
                      className="w-full mt-4 py-2 bg-genius-500 text-white rounded-lg text-sm font-medium hover:bg-genius-400 transition-colors"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Multi-City Layout */
            <div className="mb-6">
              <div className="space-y-6">
                {flightSegments.map((segment, index) => (
                  <div key={segment.id} className="space-y-3">
                    {/* Flight Heading */}
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-black">Flight {index + 1}</h3>
                      {index >= 2 && (
                        <button
                          onClick={() => removeFlightSegment(segment.id)}
                          className="text-genius-500 hover:text-genius-600 font-medium text-sm transition-colors cursor-pointer"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4">
                      {/* From */}
                      <div className="flex-1 min-w-[180px]">
                        <label className="flex items-center gap-2 text-sm font-medium text-black mb-2">
                          <MdFlight className="text-base" />
                          Leaving from
                        </label>
                        <input
                          type="text"
                          placeholder="City or Airport"
                          value={segment.from}
                          onChange={(e) => updateFlightSegment(segment.id, 'from', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-all duration-200 text-black placeholder-black/50 text-sm focus:border-genius-500 focus:ring-2 focus:ring-genius-500/20"
                        />
                      </div>

                      {/* To */}
                      <div className="flex-1 min-w-[180px]">
                        <label className="flex items-center gap-2 text-sm font-medium text-black mb-2">
                          <MdLocationOn className="text-base" />
                          Going to
                        </label>
                        <input
                          type="text"
                          placeholder="City or Airport"
                          value={segment.to}
                          onChange={(e) => updateFlightSegment(segment.id, 'to', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-all duration-200 text-black placeholder-black/50 text-sm focus:border-genius-500 focus:ring-2 focus:ring-genius-500/20"
                        />
                      </div>

                      {/* Date */}
                      <div className="flex-1 min-w-[160px]">
                        <label className="flex items-center gap-2 text-sm font-medium text-black mb-2">
                          <MdCalendarToday className="text-base" />
                          Date
                        </label>
                        <input
                          type="date"
                          value={segment.date}
                          onChange={(e) => updateFlightSegment(segment.id, 'date', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-all duration-200 text-black text-sm focus:border-genius-500 focus:ring-2 focus:ring-genius-500/20"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Another Flight Button */}
              <button
                onClick={addFlightSegment}
                className="mt-4 flex items-center gap-2 text-genius-500 hover:text-genius-600 font-medium text-sm transition-colors cursor-pointer"
              >
                <MdAdd className="text-lg" />
                Add Another Flight
              </button>

              {/* Passengers for Multi-City */}
              <div className="mt-6 flex gap-4">
                <div className="flex-1 relative">
                  <label className="flex items-center gap-2 text-sm font-medium text-black mb-2">
                    <MdPeople className="text-base" />
                    Passenger(s)
                  </label>
                  <button
                    onClick={() => setShowPassengers(!showPassengers)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left outline-none transition-all duration-200 text-black hover:border-gray-400 text-sm cursor-pointer"
                  >
                    {totalPassengers} Passenger{totalPassengers !== 1 ? 's' : ''}
                  </button>

                  {/* Passenger Dropdown */}
                  {showPassengers && (
                    <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg p-4 z-20 shadow-lg">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-black font-medium text-sm">Adults</span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                setPassengers({
                                  ...passengers,
                                  adults: Math.max(1, passengers.adults - 1),
                                })
                              }
                              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-black font-bold transition-colors text-sm cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-8 text-center font-semibold text-black text-sm">
                              {passengers.adults}
                            </span>
                            <button
                              onClick={() =>
                                setPassengers({
                                  ...passengers,
                                  adults: passengers.adults + 1,
                                })
                              }
                              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-black font-bold transition-colors text-sm cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-black font-medium text-sm">Children</span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                setPassengers({
                                  ...passengers,
                                  children: Math.max(0, passengers.children - 1),
                                })
                              }
                              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-black font-bold transition-colors text-sm cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-8 text-center font-semibold text-black text-sm">
                              {passengers.children}
                            </span>
                            <button
                              onClick={() =>
                                setPassengers({
                                  ...passengers,
                                  children: passengers.children + 1,
                                })
                              }
                              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-black font-bold transition-colors text-sm cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-black font-medium text-sm">Infants</span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                setPassengers({
                                  ...passengers,
                                  infants: Math.max(0, passengers.infants - 1),
                                })
                              }
                              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-black font-bold transition-colors text-sm cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-8 text-center font-semibold text-black text-sm">
                              {passengers.infants}
                            </span>
                            <button
                              onClick={() =>
                                setPassengers({
                                  ...passengers,
                                  infants: passengers.infants + 1,
                                })
                              }
                              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-black font-bold transition-colors text-sm cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowPassengers(false)}
                        className="w-full mt-4 py-2 bg-genius-500 text-white rounded-lg text-sm font-medium hover:bg-genius-400 transition-colors"
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Search Button */}
          <button 
            onClick={handleSearch}
            disabled={isSearching}
            className="w-full bg-genius-500 hover:bg-genius-400 disabled:bg-genius-300 text-white py-4 rounded-xl font-medium text-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {isSearching ? (
              <>
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Searching...
              </>
            ) : (
              <>
                <MdSearch size={24} />
                Search Flights
              </>
            )}
          </button>

          {/* Popular Routes */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-600 mb-3">Popular Routes</h3>
            <div className="flex flex-wrap gap-2">
              {popularRoutes.map((route, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setFrom(route.from);
                    setTo(route.to);
                    setTripType('roundtrip');
                  }}
                  className="px-4 py-2 bg-gray-100 hover:bg-genius-50 hover:text-genius-600 rounded-full text-sm text-gray-700 transition-colors cursor-pointer"
                >
                  {route.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
