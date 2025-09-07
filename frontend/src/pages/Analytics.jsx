import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7days');
  const [selectedMetric, setSelectedMetric] = useState('usage');

  // Sample analytics data
  const monthlyData = [
    { month: 'Jan', usage: 450, cost: 67.50, efficiency: 85, target: 400 },
    { month: 'Feb', usage: 380, cost: 57.00, efficiency: 88, target: 400 },
    { month: 'Mar', usage: 520, cost: 78.00, efficiency: 82, target: 500 },
    { month: 'Apr', usage: 480, cost: 72.00, efficiency: 86, target: 500 },
    { month: 'May', usage: 620, cost: 93.00, efficiency: 78, target: 600 },
    { month: 'Jun', usage: 720, cost: 108.00, efficiency: 75, target: 700 },
    { month: 'Jul', usage: 850, cost: 127.50, efficiency: 72, target: 800 },
    { month: 'Aug', usage: 780, cost: 117.00, efficiency: 74, target: 800 },
    { month: 'Sep', usage: 650, cost: 97.50, efficiency: 79, target: 700 },
    { month: 'Oct', usage: 520, cost: 78.00, efficiency: 83, target: 500 },
    { month: 'Nov', usage: 420, cost: 63.00, efficiency: 87, target: 450 },
    { month: 'Dec', usage: 480, cost: 72.00, efficiency: 85, target: 500 }
  ];

  const hourlyUsage = [
    { hour: '00', usage: 2.1, peak: false }, { hour: '01', usage: 1.8, peak: false },
    { hour: '02', usage: 1.6, peak: false }, { hour: '03', usage: 1.5, peak: false },
    { hour: '04', usage: 1.4, peak: false }, { hour: '05', usage: 1.7, peak: false },
    { hour: '06', usage: 2.8, peak: true }, { hour: '07', usage: 4.2, peak: true },
    { hour: '08', usage: 3.8, peak: true }, { hour: '09', usage: 3.2, peak: false },
    { hour: '10', usage: 3.5, peak: false }, { hour: '11', usage: 4.1, peak: false },
    { hour: '12', usage: 4.8, peak: true }, { hour: '13', usage: 5.2, peak: true },
    { hour: '14', usage: 5.8, peak: true }, { hour: '15', usage: 6.1, peak: true },
    { hour: '16', usage: 5.9, peak: true }, { hour: '17', usage: 6.8, peak: true },
    { hour: '18', usage: 7.2, peak: true }, { hour: '19', usage: 6.5, peak: true },
    { hour: '20', usage: 5.8, peak: true }, { hour: '21', usage: 4.9, peak: false },
    { hour: '22', usage: 3.6, peak: false }, { hour: '23', usage: 2.8, peak: false }
  ];

  const applianceData = [
    { name: 'Air Conditioner', current: 285, previous: 320, efficiency: 89, savings: 12 },
    { name: 'Water Heater', current: 125, previous: 135, efficiency: 92, savings: 8 },
    { name: 'Refrigerator', current: 95, previous: 90, efficiency: 94, savings: -5 },
    { name: 'Lighting', current: 65, previous: 85, efficiency: 96, savings: 24 },
    { name: 'Electronics', current: 45, previous: 50, efficiency: 91, savings: 10 },
    { name: 'Others', current: 35, previous: 40, efficiency: 88, savings: 13 }
  ];

  const deviceUsage = [
    { name: 'HVAC', value: 42, color: '#6366F1', amount: 285 },
    { name: 'Water Heating', value: 18, color: '#8B5CF6' },
    { name: 'Lighting', value: 12, color: '#06B6D4' },
    { name: 'Appliances', value: 16, color: '#10B981' },
    { name: 'Electronics', value: 8, color: '#F59E0B' },
    { name: 'Other', value: 4, color: '#EF4444' }
  ];

  const weeklyComparison = [
    { day: 'Mon', thisWeek: 28.5, lastWeek: 32.1, avg: 30.2 },
    { day: 'Tue', thisWeek: 26.8, lastWeek: 29.4, avg: 28.9 },
    { day: 'Wed', thisWeek: 31.2, lastWeek: 35.8, avg: 33.1 },
    { day: 'Thu', thisWeek: 29.7, lastWeek: 31.2, avg: 30.8 },
    { day: 'Fri', thisWeek: 33.4, lastWeek: 36.9, avg: 35.1 },
    { day: 'Sat', thisWeek: 38.1, lastWeek: 41.2, avg: 39.8 },
    { day: 'Sun', thisWeek: 35.6, lastWeek: 38.4, avg: 37.2 }
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label, type = 'default' }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-xl">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          {payload.map((pld, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: pld.color }}
              ></div>
              <span className="text-gray-600">{pld.dataKey}:</span>
              <span className="font-medium text-gray-800">
                {type === 'currency' ? `$${pld.value}` : 
                 type === 'percentage' ? `${pld.value}%` :
                 `${pld.value} ${pld.dataKey === 'usage' ? 'kWh' : pld.unit || ''}`}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const MetricCard = ({ title, value, unit, change, icon, trend, color = "blue" }) => {
    const colorClasses = {
      blue: 'from-blue-500 to-indigo-600 text-white',
      green: 'from-emerald-500 to-teal-600 text-white',
      purple: 'from-purple-500 to-violet-600 text-white',
      orange: 'from-orange-500 to-red-500 text-white'
    };

    return (
      <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                {icon}
              </div>
              <h3 className="font-medium text-white/80 text-sm">{title}</h3>
            </div>
            <div className="flex items-baseline space-x-2 mb-3">
              <span className="text-3xl font-bold">{value}</span>
              <span className="text-lg font-medium text-white/80">{unit}</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg className={`w-4 h-4 ${trend === 'up' ? 'rotate-0' : 'rotate-180'} ${trend === 'up' ? 'text-red-200' : 'text-green-200'}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 14.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-white/90">{change}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              📈 Energy Analytics
            </h1>
            <p className="text-gray-600 text-lg">Discover insights and optimize your energy consumption</p>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="1year">Last Year</option>
            </select>
            <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg font-medium">
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Daily Average"
            value="24.5"
            unit="kWh"
            change="↑ 12% vs last month"
            trend="up"
            color="blue"
            icon={<svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>}
          />
          <MetricCard
            title="Peak Demand"
            value="7.2"
            unit="kW"
            change="↓ 5% improvement"
            trend="down"
            color="green"
            icon={<svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>}
          />
          <MetricCard
            title="Efficiency Score"
            value="84"
            unit="%"
            change="↑ 3% this month"
            trend="down"
            color="purple"
            icon={<svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
          />
          <MetricCard
            title="Cost Savings"
            value="$23"
            unit="saved"
            change="↑ 18% vs target"
            trend="down"
            color="orange"
            icon={<svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" /></svg>}
          />
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Monthly Trends - Takes 2 columns */}
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Monthly Energy Trends</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
                <span>Usage</span>
                <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full ml-4"></div>
                <span>Target</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.5} />
                <XAxis 
                  dataKey="month" 
                  stroke="#6B7280" 
                  fontSize={12}
                  tick={{ fill: '#6B7280' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis 
                  stroke="#6B7280" 
                  fontSize={12}
                  tick={{ fill: '#6B7280' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  fill="url(#targetGradient)"
                  strokeDasharray="5 5"
                />
                <Area 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="#6366F1" 
                  strokeWidth={3}
                  fill="url(#usageGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Device Usage Pie Chart */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Energy Distribution</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={deviceUsage}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={130}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {deviceUsage.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke="#ffffff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip type="percentage" />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {deviceUsage.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full shadow-sm" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600 truncate">{item.name}</span>
                  <span className="text-sm font-medium text-gray-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Secondary Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Hourly Usage Pattern */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">24-Hour Usage Pattern</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyUsage}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0.6}/>
                  </linearGradient>
                  <linearGradient id="peakGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0.7}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.5} />
                <XAxis 
                  dataKey="hour" 
                  stroke="#6B7280" 
                  fontSize={11} 
                  interval={1}
                  tick={{ fill: '#6B7280' }}
                />
                <YAxis 
                  stroke="#6B7280" 
                  fontSize={12}
                  tick={{ fill: '#6B7280' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="usage" 
                  fill="url(#barGradient)"
                  radius={[4, 4, 0, 0]}
                  stroke="#ffffff"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Comparison */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Weekly Comparison</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.5} />
                <XAxis 
                  dataKey="day" 
                  stroke="#6B7280" 
                  fontSize={12}
                  tick={{ fill: '#6B7280' }}
                />
                <YAxis 
                  stroke="#6B7280" 
                  fontSize={12}
                  tick={{ fill: '#6B7280' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="lastWeek" 
                  stroke="#94A3B8" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#94A3B8', strokeWidth: 2, r: 4 }}
                  name="Last Week"
                />
                <Line 
                  type="monotone" 
                  dataKey="thisWeek" 
                  stroke="#6366F1" 
                  strokeWidth={3}
                  dot={{ fill: '#6366F1', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, stroke: '#6366F1', strokeWidth: 2, fill: '#ffffff' }}
                  name="This Week"
                />
                <Line 
                  type="monotone" 
                  dataKey="avg" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  name="Average"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Appliance Analysis */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Appliance Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applianceData.map((appliance, index) => {
              const change = ((appliance.current - appliance.previous) / appliance.previous * 100).toFixed(1);
              const isImprovement = change < 0;
              return (
                <div key={index} className="bg-gradient-to-br from-white/50 to-gray-50/50 backdrop-blur-sm p-6 rounded-2xl border border-white/30 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-800 text-lg">{appliance.name}</h4>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${appliance.efficiency >= 90 ? 'bg-green-400' : appliance.efficiency >= 85 ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
                      <span className="text-sm font-medium text-gray-600">{appliance.efficiency}%</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Current</span>
                      <span className="font-bold text-gray-800">{appliance.current} kWh</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Change</span>
                      <span className={`font-semibold ${isImprovement ? 'text-green-600' : 'text-red-500'}`}>
                        {isImprovement ? '↓' : '↑'} {Math.abs(change)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Savings</span>
                      <span className={`font-semibold ${appliance.savings > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        ${appliance.savings > 0 ? '+' : ''}${appliance.savings}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
                      style={{ width: `${appliance.efficiency}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-3xl p-8 shadow-xl text-white">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="mr-3">💡</span>
            Smart Energy Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/15 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-semibold text-lg">Peak Hour Shifting</h4>
              </div>
              <p className="text-white/90 text-sm leading-relaxed">
                Move high-energy tasks to off-peak hours (11 PM - 6 AM) to save up to $15/month on your electricity bill.
              </p>
            </div>
            
            <div className="bg-white/15 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-semibold text-lg">Smart Thermostat</h4>
              </div>
              <p className="text-white/90 text-sm leading-relaxed">
                Optimize your HVAC system by adjusting temperature by 2°F during peak hours to reduce consumption by 12%.
              </p>
            </div>
            
            <div className="bg-white/15 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-semibold text-lg">Device Automation</h4>
              </div>
              <p className="text-white/90 text-sm leading-relaxed">
                Use smart plugs to automatically power down standby devices, potentially saving $8-12 monthly.
              </p>
            </div>
          </div>
        </div>

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
            <p className="text-gray-600 text-xs mt-1">All Rights Reserved.© 2025❤️‍🔥</p>
          </div>
        </div>
      </div>
    </div>
  );
}