import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [dataPoints, setDataPoints] = useState([]);
  const [connected, setConnected] = useState(false);
  const [todayUsage, setTodayUsage] = useState(0);
  const [monthlyUsage, setMonthlyUsage] = useState(0);
  const [cost, setCost] = useState(0);
  const [currentPower, setCurrentPower] = useState(0);

  useEffect(() => {
    if (!connected) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeLabel = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });

      // More realistic power consumption simulation based on time of day
      const hour = now.getHours();
      let baseLoad = 2; // Base household load
      
      // Add time-of-day variations
      if (hour >= 6 && hour <= 9) baseLoad += 3; // Morning peak
      if (hour >= 17 && hour <= 22) baseLoad += 4; // Evening peak
      if (hour >= 12 && hour <= 14) baseLoad += 2; // Lunch time
      
      // Add random variation (±20%)
      const variation = (Math.random() - 0.5) * 0.4 * baseLoad;
      const newPoint = Math.max(0.5, baseLoad + variation);
      
      setCurrentPower(newPoint);
      setDataPoints((prev) => [...prev.slice(-19), { time: timeLabel, value: newPoint }]);
      
      // Accumulate usage (convert kW to kWh by dividing by updates per hour)
      const kWhIncrement = newPoint / 1200; // 3-second intervals = 1200 per hour
      setTodayUsage((prev) => prev + kWhIncrement);
      setMonthlyUsage((prev) => prev + kWhIncrement * 30);
      setCost((prev) => prev + kWhIncrement * 0.15); // $0.15 per kWh
    }, 3000); // Update every 3 seconds for smoother animation

    return () => clearInterval(interval);
  }, [connected]);

  const StatCard = ({ title, value, unit, icon, trend, trendValue, color }) => (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <div className="flex items-baseline space-x-1">
            <span className={`text-3xl font-bold ${color}`}>{value}</span>
            <span className="text-lg text-gray-500">{unit}</span>
          </div>
          {trend && (
            <div className={`flex items-center mt-2 ${trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>
              <svg className={`w-4 h-4 mr-1 ${trend === 'up' ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 4.414 6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">{trendValue}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color.replace('text-', 'bg-').replace('-600', '-100')}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 drop-shadow">📊 Energy Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor your home's energy consumption in real-time</p>
        </div>
        <button
          onClick={() => setConnected(!connected)}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg ${
            connected
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          } transform hover:scale-105`}
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            <span>{connected ? 'Disconnect Meter' : 'Connect Meter'}</span>
          </div>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Current Power"
          value={currentPower.toFixed(1)}
          unit="kW"
          color="text-blue-600"
          trend="up"
          trendValue="12%"
          icon={<svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>}
        />
        <StatCard
          title="Today's Usage"
          value={todayUsage.toFixed(1)}
          unit="kWh"
          color="text-emerald-600"
          trend="down"
          trendValue="5%"
          icon={<svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard
          title="Monthly Usage"
          value={monthlyUsage.toFixed(0)}
          unit="kWh"
          color="text-purple-600"
          trend="up"
          trendValue="8%"
          icon={<svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" /></svg>}
        />
        <StatCard
          title="Total Cost"
          value={`$${cost.toFixed(2)}`}
          unit=""
          color="text-orange-600"
          trend="up"
          trendValue="$3.50"
          icon={<svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" /></svg>}
        />
      </div>

      {/* Real-time Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Energy Usage Over Time</h2>
          <div className="flex items-center space-x-2">
            {connected && (
              <div className="flex items-center space-x-2 text-sm text-green-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live</span>
              </div>
            )}
            <select className="text-sm border border-gray-300 rounded-lg px-2 py-1">
              <option>Power (kW)</option>
              <option>Voltage (V)</option>
              <option>Current (A)</option>
            </select>
          </div>
        </div>
        {connected && dataPoints.length > 0 ? (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={dataPoints}>
              <defs>
                <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4ADE80" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="time" 
                stroke="#6b7280" 
                fontSize={11}
                tick={{ fill: '#6b7280' }}
              />
              <YAxis 
                stroke="#6b7280" 
                fontSize={11}
                tick={{ fill: '#6b7280' }}
                label={{ value: 'Usage (kW)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
                labelStyle={{ color: '#374151' }}
                formatter={(value, name) => [`${value} kW`, 'Current Usage']}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#4ADE80" 
                strokeWidth={3}
                dot={{ fill: '#4ADE80', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#4ADE80', strokeWidth: 2 }}
                fill="url(#colorUsage)"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[350px] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium text-lg mb-2">Connect your meter to see live data</p>
              <p className="text-gray-400 text-sm">Real-time energy consumption will appear here</p>
            </div>
          </div>
        )}
      </div>

      {/* Live Analysis when connected */}
      {connected && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Live Electrical Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900">Voltage</h3>
                  <p className="text-2xl font-bold text-blue-800">{(220 + Math.random() * 10 - 5).toFixed(1)}V</p>
                  <p className="text-xs text-blue-600">Normal range: 220-240V</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-500 rounded-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-orange-900">Current</h3>
                  <p className="text-2xl font-bold text-orange-800">{(currentPower / 220 * 1000).toFixed(1)}A</p>
                  <p className="text-xs text-orange-600">Peak: {((currentPower + 2) / 220 * 1000).toFixed(1)}A</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-green-900">Power Factor</h3>
                  <p className="text-2xl font-bold text-green-800">{(0.85 + Math.random() * 0.1).toFixed(2)}</p>
                  <p className="text-xs text-green-600">Efficiency: Good</p>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time waveform simulation */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-3">Current Waveform</h3>
            <div className="h-24 bg-black rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full relative">
                  {/* Simulated sine wave */}
                  <svg className="w-full h-full" viewBox="0 0 400 100">
                    <path
                      d="M0,50 Q25,20 50,50 T100,50 T150,50 T200,50 T250,50 T300,50 T350,50 T400,50"
                      fill="none"
                      stroke="#4ADE80"
                      strokeWidth="2"
                      className="animate-pulse"
                    />
                    <path
                      d="M0,50 Q25,80 50,50 T100,50 T150,50 T200,50 T250,50 T300,50 T350,50 T400,50"
                      fill="none"
                      stroke="#4ADE80"
                      strokeWidth="1"
                      opacity="0.5"
                    />
                  </svg>
                </div>
              </div>
              <div className="absolute top-2 left-2 text-green-400 text-xs font-mono">
                {(currentPower / 220 * 1000).toFixed(1)}A RMS
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Copyright Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl">
            <span className="text-white font-medium">Woven from circuits and imagination.<br /></span>
            <span className="text-white font-medium">by</span>
            <span className="text-white font-bold tracking-wide text-lg">Vanka Nikhil</span>
           <span className="text-white font-bold tracking-wide text-lg">&nbsp;and Team🐦‍🔥</span>
            <span className="text-white/80 mx-2">•</span>
            <span className="text-white font-medium">Household Watch</span>
          </div><br />
          <div className="mt-4 bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/30 inline-block shadow-lg">
            <p className="text-gray-600 text-xs mt-1">All Rights Reserved.© 2025⚡.</p>
          </div>
        </div>
    </div>
  );
}