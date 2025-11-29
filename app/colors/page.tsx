import React from 'react';

export default function ColorPalette() {
  const colorScales = [
    { name: 'genius-50', class: 'bg-genius-50', text: 'text-genius-900' },
    { name: 'genius-100', class: 'bg-genius-100', text: 'text-genius-900' },
    { name: 'genius-200', class: 'bg-genius-200', text: 'text-genius-900' },
    { name: 'genius-300', class: 'bg-genius-300', text: 'text-genius-900' },
    { name: 'genius-400', class: 'bg-genius-400', text: 'text-white' },
    { name: 'genius-500', class: 'bg-genius-500', text: 'text-white', isPrimary: true },
    { name: 'genius-600', class: 'bg-genius-600', text: 'text-white' },
    { name: 'genius-700', class: 'bg-genius-700', text: 'text-white' },
    { name: 'genius-800', class: 'bg-genius-800', text: 'text-white' },
    { name: 'genius-900', class: 'bg-genius-900', text: 'text-white' },
    { name: 'genius-950', class: 'bg-genius-950', text: 'text-white' },
  ];

  const accentColors = [
    { name: 'genius-sky', class: 'bg-genius-sky', text: 'text-white', description: 'Lighter sky blue' },
    { name: 'genius-ocean', class: 'bg-genius-ocean', text: 'text-white', description: 'Deep ocean blue' },
    { name: 'genius-sunset', class: 'bg-genius-sunset', text: 'text-white', description: 'Warm sunset orange' },
    { name: 'genius-cloud', class: 'bg-genius-cloud', text: 'text-genius-900', description: 'Very light blue' },
    { name: 'genius-night', class: 'bg-genius-night', text: 'text-white', description: 'Dark blue' },
  ];

  const functionalColors = [
    { name: 'genius-success', class: 'bg-genius-success', text: 'text-white', description: 'Success state' },
    { name: 'genius-warning', class: 'bg-genius-warning', text: 'text-white', description: 'Warning state' },
    { name: 'genius-error', class: 'bg-genius-error', text: 'text-white', description: 'Error state' },
    { name: 'genius-info', class: 'bg-genius-info', text: 'text-white', description: 'Info state' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-genius-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-genius-900 mb-4">
            Flight Genius Color Palette
          </h1>
          <p className="text-lg text-genius-600">
            Custom color system based on our brand identity
          </p>
        </div>

        {/* Primary Color Scale */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-genius-800 mb-6">Primary Color Scale</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {colorScales.map((color) => (
              <div
                key={color.name}
                className={`${color.class} ${color.text} rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
              >
                <div className="font-bold text-lg mb-2">
                  {color.name}
                  {color.isPrimary && (
                    <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded">PRIMARY</span>
                  )}
                </div>
                <div className="text-sm opacity-90">Logo Blue Scale</div>
              </div>
            ))}
          </div>
        </section>

        {/* Accent Colors */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-genius-800 mb-6">Accent Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accentColors.map((color) => (
              <div
                key={color.name}
                className={`${color.class} ${color.text} rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300`}
              >
                <div className="font-bold text-xl mb-2">{color.name}</div>
                <div className="text-sm opacity-90">{color.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Functional Colors */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-genius-800 mb-6">Functional Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {functionalColors.map((color) => (
              <div
                key={color.name}
                className={`${color.class} ${color.text} rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300`}
              >
                <div className="font-bold text-lg mb-2">{color.name}</div>
                <div className="text-sm opacity-90">{color.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Example Components */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-genius-800 mb-6">Example Components</h2>
          
          {/* Buttons */}
          <div className="bg-white rounded-xl p-8 shadow-lg mb-6">
            <h3 className="text-2xl font-semibold text-genius-700 mb-4">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <button className="bg-genius-500 hover:bg-genius-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                Primary Button
              </button>
              <button className="bg-genius-100 hover:bg-genius-200 text-genius-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                Secondary Button
              </button>
              <button className="bg-genius-sunset hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                CTA Button
              </button>
              <button className="border-2 border-genius-500 text-genius-600 hover:bg-genius-500 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200">
                Outline Button
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-genius-500 to-genius-700 text-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-3">Gradient Card</h3>
              <p className="mb-4 opacity-90">Beautiful gradient using genius-500 to genius-700</p>
              <button className="bg-white text-genius-600 px-4 py-2 rounded-lg font-semibold hover:bg-genius-50 transition-colors">
                Learn More
              </button>
            </div>
            
            <div className="bg-genius-cloud border-2 border-genius-200 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-genius-800 mb-3">Light Card</h3>
              <p className="text-genius-600 mb-4">Soft background with genius-cloud color</p>
              <button className="bg-genius-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-genius-600 transition-colors">
                Get Started
              </button>
            </div>
          </div>

          {/* Alerts */}
          <div className="space-y-4">
            <div className="bg-genius-success/10 border-l-4 border-genius-success text-genius-success p-4 rounded-lg">
              <strong>Success!</strong> Your flight booking was confirmed.
            </div>
            <div className="bg-genius-warning/10 border-l-4 border-genius-warning text-genius-warning p-4 rounded-lg">
              <strong>Warning:</strong> Flight departure time has changed.
            </div>
            <div className="bg-genius-error/10 border-l-4 border-genius-error text-genius-error p-4 rounded-lg">
              <strong>Error:</strong> Unable to process payment.
            </div>
            <div className="bg-genius-info/10 border-l-4 border-genius-info text-genius-info p-4 rounded-lg">
              <strong>Info:</strong> Check-in opens 24 hours before departure.
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-genius-600 mt-16 pb-8">
          <p className="text-sm">Flight Genius Color Palette • Designed for excellence</p>
        </footer>
      </div>
    </div>
  );
}
