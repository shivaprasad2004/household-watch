import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Devices() {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Mock device data
  const devices = [
    {
      id: 1,
      name: "Air Conditioner",
      room: "Living Room",
      type: "Climate Control",
      status: "active",
      currentUsage: 2.8,
      dailyUsage: 18.5,
      monthlyUsage: 285,
      efficiency: 89,
      schedule: "Auto",
      lastActive: "Now",
      icon: "❄️",
      color: "blue",
      weeklyData: [
        { day: 'Mon', usage: 16.2 }, { day: 'Tue', usage: 18.5 }, 
        { day: 'Wed', usage: 15.8 }, { day: 'Thu', usage: 19.2 },
        { day: 'Fri', usage: 17.6 }, { day: 'Sat', usage: 22.3 }, 
        { day: 'Sun', usage: 20.1 }
      ]
    },
    {
      id: 2,
      name: "Water Heater",
      room: "Utility Room",
      type: "Water Heating",
      status: "active",
      currentUsage: 3.2,
      dailyUsage: 12.4,
      monthlyUsage: 125,
      efficiency: 92,
      schedule: "Timer",
      lastActive: "2 min ago",
      icon: "🔥",
      color: "orange",
      weeklyData: [
        { day: 'Mon', usage: 11.2 }, { day: 'Tue', usage: 12.8 }, 
        { day: 'Wed', usage: 10.9 }, { day: 'Thu', usage: 13.1 },
        { day: 'Fri', usage: 12.6 }, { day: 'Sat', usage: 14.2 }, 
        { day: 'Sun', usage: 13.8 }
      ]
    },
    {
      id: 3,
      name: "Refrigerator",
      room: "Kitchen",
      type: "Appliance",
      status: "active",
      currentUsage: 0.8,
      dailyUsage: 4.2,
      monthlyUsage: 95,
      efficiency: 94,
      schedule: "Always On",
      lastActive: "Now",
      icon: "🧊",
      color: "green",
      weeklyData: [
        { day: 'Mon', usage: 4.1 }, { day: 'Tue', usage: 4.3 }, 
        { day: 'Wed', usage: 4.0 }, { day: 'Thu', usage: 4.4 },
        { day: 'Fri', usage: 4.2 }, { day: 'Sat', usage: 4.6 }, 
        { day: 'Sun', usage: 4.5 }
      ]
    },
    {
      id: 4,
      name: "Smart TV",
      room: "Living Room",
      type: "Entertainment",
      status: "standby",
      currentUsage: 0.1,
      dailyUsage: 3.2,
      monthlyUsage: 45,
      efficiency: 91,
      schedule: "Manual",
      lastActive: "3 hours ago",
      icon: "📺",
      color: "purple",
      weeklyData: [
        { day: 'Mon', usage: 2.8 }, { day: 'Tue', usage: 3.5 }, 
        { day: 'Wed', usage: 2.9 }, { day: 'Thu', usage: 3.8 },
        { day: 'Fri', usage: 4.2 }, { day: 'Sat', usage: 5.1 }, 
        { day: 'Sun', usage: 4.8 }
      ]
    },
    {
      id: 5,
      name: "Washing Machine",
      room: "Laundry Room",
      type: "Appliance",
      status: "inactive",
      currentUsage: 0.0,
      dailyUsage: 2.1,
      monthlyUsage: 35,
      efficiency: 88,
      schedule: "Manual",
      lastActive: "1 day ago",
      icon: "🧺",
      color: "teal",
      weeklyData: [
        { day: 'Mon', usage: 2.1 }, { day: 'Tue', usage: 0.0 }, 
        { day: 'Wed', usage: 2.3 }, { day: 'Thu', usage: 0.0 },
        { day: 'Fri', usage: 1.8 }, { day: 'Sat', usage: 2.5 }, 
        { day: 'Sun', usage: 2.0 }
      ]
    },
    {
      id: 6,
      name: "LED Lights",
      room: "Whole House",
      type: "Lighting",
      status: "active",
      currentUsage: 0.6,
      dailyUsage: 5.8,
      monthlyUsage: 65,
      efficiency: 96,
      schedule: "Smart",
      lastActive: "Now",
      icon: "💡",
      color: "yellow",
      weeklyData: [
        { day: 'Mon', usage: 5.2 }, { day: 'Tue', usage: 5.8 }, 
        { day: 'Wed', usage: 5.1 }, { day: 'Thu', usage: 6.2 },
        { day: 'Fri', usage: 5.9 }, { day: 'Sat', usage: 6.8 }, 
        { day: 'Sun', usage: 6.5 }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'standby': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'from-blue-500 to-blue-600 border-blue-200',
      orange: 'from-orange-500 to-orange-600 border-orange-200',
      green: 'from-green-500 to-green-600 border-green-200',
      purple: 'from-purple-500 to-purple-600 border-purple-200',
      teal: 'from-teal-500 to-teal-600 border-teal-200',
      yellow: 'from-yellow-500 to-yellow-600 border-yellow-200'
    };
    return colorMap[color] || 'from-gray-500 to-gray-600 border-gray-200';
  };

  const DeviceCard = ({ device }) => (
    <div 
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={() => setSelectedDevice(device)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${getColorClasses(device.color)} text-white text-2xl`}>
          {device.icon}
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
          {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{device.name}</h3>
          <p className="text-sm text-gray-600">{device.room} • {device.type}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Current Usage</p>
            <p className="text-lg font-bold text-gray-900">{device.currentUsage} kW</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Daily Usage</p>
            <p className="text-lg font-bold text-gray-900">{device.dailyUsage} kWh</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Efficiency: {device.efficiency}%</span>
            </div>
          </div>
          <span className="text-xs text-gray-500">Last: {device.lastActive}</span>
        </div>
      </div>
    </div>
  );

  const DeviceModal = ({ device, onClose }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${getColorClasses(device.color)} text-white text-2xl`}>
                {device.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{device.name}</h2>
                <p className="text-gray-600">{device.room} • {device.type}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Device Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl text-center">
              <p className="text-sm text-blue-600 mb-1">Current Usage</p>
              <p className="text-2xl font-bold text-blue-700">{device.currentUsage} kW</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl text-center">
              <p className="text-sm text-green-600 mb-1">Daily Usage</p>
              <p className="text-2xl font-bold text-green-700">{device.dailyUsage} kWh</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl text-center">
              <p className="text-sm text-purple-600 mb-1">Monthly Usage</p>
              <p className="text-2xl font-bold text-purple-700">{device.monthlyUsage} kWh</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl text-center">
              <p className="text-sm text-orange-600 mb-1">Efficiency</p>
              <p className="text-2xl font-bold text-orange-700">{device.efficiency}%</p>
            </div>
          </div>

          {/* Weekly Usage Chart */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Weekly Usage Pattern</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={device.weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Device Controls */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Device Controls</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="auto">Auto</option>
                  <option value="timer">Timer</option>
                  <option value="manual">Manual</option>
                  <option value="smart">Smart</option>
                </select>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <label className="block text-sm font-medium text-gray-700 mb-2">Power Mode</label>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm">On</button>
                  <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg text-sm">Off</button>
                  <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm">Standby</button>
                </div>
              </div>
            </div>
          </div>

          {/* Smart Recommendations */}
          <div className="bg-blue-50 p-4 rounded-xl">
            <h4 className="font-semibold text-blue-700 mb-2">💡 Smart Recommendations</h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• Reduce usage by 15% during peak hours (6-9 PM)</li>
              <li>• Schedule maintenance check - efficiency dropped 3% this month</li>
              <li>• Consider upgrading to energy-efficient model for 25% savings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">⚡ Smart Devices</h1>
            <p className="text-gray-600 mt-1">Monitor and control your connected devices</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                List
              </button>
            </div>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add Device
            </button>
          </div>
        </div>

        {/* Device Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Devices</p>
                <p className="text-xl font-bold text-gray-900">4</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">On Standby</p>
                <p className="text-xl font-bold text-gray-900">1</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Offline</p>
                <p className="text-xl font-bold text-gray-900">1</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Power</p>
                <p className="text-xl font-bold text-gray-900">7.5 kW</p>
              </div>
            </div>
          </div>
        </div>

        {/* Devices Grid */}
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
        }>
          {devices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>

        {/* Device Detail Modal */}
        {selectedDevice && (
          <DeviceModal 
            device={selectedDevice} 
            onClose={() => setSelectedDevice(null)} 
          />
        )}
        {/* Copyright Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl">
            <span className="text-white font-medium">Woven from circuits and imagination.</span>
            <span className="text-white font-medium">by</span>
            <span className="text-white font-bold tracking-wide text-lg">Vanka Nikhil</span>
           <span className="text-white font-bold tracking-wide text-lg">&nbsp;and Team🐦‍🔥</span>
            <span className="text-white/80 mx-2">•</span>
            <span className="text-white font-medium">Household Watch</span>
          </div><br />
          <div className="mt-4 bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/30 inline-block shadow-lg">
            <p className="text-gray-600 text-xs mt-1">All Rights Reserved.© 2025🐦‍🔥</p>
          </div>
        </div>
      </div>
    </div>
  );
}