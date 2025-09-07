import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function Bills() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedBill, setSelectedBill] = useState(null);

  // Mock billing data
  const bills = [
    {
      id: 1,
      month: "November 2024",
      amount: 127.50,
      usage: 850,
      dueDate: "2024-12-15",
      status: "paid",
      paymentDate: "2024-12-10",
      breakdown: {
        energy: 89.25,
        delivery: 23.80,
        taxes: 14.45
      }
    },
    {
      id: 2,
      month: "October 2024",
      amount: 98.75,
      usage: 658,
      dueDate: "2024-11-15",
      status: "paid",
      paymentDate: "2024-11-12",
      breakdown: {
        energy: 69.13,
        delivery: 18.45,
        taxes: 11.17
      }
    },
    {
      id: 3,
      month: "September 2024",
      amount: 145.20,
      usage: 968,
      dueDate: "2024-10-15",
      status: "paid",
      paymentDate: "2024-10-08",
      breakdown: {
        energy: 101.64,
        delivery: 27.12,
        taxes: 16.44
      }
    },
    {
      id: 4,
      month: "December 2024",
      amount: 156.80,
      usage: 1045,
      dueDate: "2024-12-28",
      status: "pending",
      paymentDate: null,
      breakdown: {
        energy: 109.76,
        delivery: 29.26,
        taxes: 17.78
      }
    }
  ];

  const monthlyTrends = [
    { month: 'Jan', amount: 89.50, usage: 596, budget: 100 },
    { month: 'Feb', amount: 76.25, usage: 508, budget: 100 },
    { month: 'Mar', amount: 112.80, usage: 752, budget: 100 },
    { month: 'Apr', amount: 98.60, usage: 657, budget: 100 },
    { month: 'May', amount: 134.90, usage: 899, budget: 120 },
    { month: 'Jun', amount: 167.30, usage: 1115, budget: 150 },
    { month: 'Jul', amount: 189.75, usage: 1265, budget: 180 },
    { month: 'Aug', amount: 178.20, usage: 1188, budget: 180 },
    { month: 'Sep', amount: 145.20, usage: 968, budget: 150 },
    { month: 'Oct', amount: 98.75, usage: 658, budget: 120 },
    { month: 'Nov', amount: 127.50, usage: 850, budget: 120 },
    { month: 'Dec', amount: 156.80, usage: 1045, budget: 150 }
  ];

  const costBreakdown = [
    { name: 'Energy Charges', value: 65, amount: 101.52, color: '#3B82F6' },
    { name: 'Delivery Charges', value: 22, amount: 34.36, color: '#10B981' },
    { name: 'Taxes & Fees', value: 13, amount: 20.92, color: '#F59E0B' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const BillCard = ({ bill }) => (
    <div 
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => setSelectedBill(bill)}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{bill.month}</h3>
          <p className="text-sm text-gray-600">Due: {new Date(bill.dueDate).toLocaleDateString()}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(bill.status)}`}>
          {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Amount</span>
          <span className="text-2xl font-bold text-gray-900">${bill.amount}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Usage</span>
          <span className="text-lg font-semibold text-blue-600">{bill.usage} kWh</span>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-500 space-y-1">
            <div className="flex justify-between">
              <span>Energy:</span>
              <span>${bill.breakdown.energy}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery:</span>
              <span>${bill.breakdown.delivery}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes:</span>
              <span>${bill.breakdown.taxes}</span>
            </div>
          </div>
        </div>

        {bill.status === 'pending' && (
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            Pay Now
          </button>
        )}
      </div>
    </div>
  );

  const BillModal = ({ bill, onClose }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Bill Details</h2>
              <p className="text-gray-600">{bill.month}</p>
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
          {/* Bill Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl text-center">
              <p className="text-sm text-blue-600 mb-1">Total Amount</p>
              <p className="text-3xl font-bold text-blue-700">${bill.amount}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl text-center">
              <p className="text-sm text-green-600 mb-1">Usage</p>
              <p className="text-3xl font-bold text-green-700">{bill.usage} kWh</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl text-center">
              <p className="text-sm text-purple-600 mb-1">Rate</p>
              <p className="text-3xl font-bold text-purple-700">${(bill.amount / bill.usage).toFixed(3)}</p>
              <p className="text-xs text-purple-600">per kWh</p>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Cost Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">Energy Charges</span>
                </div>
                <span className="font-bold">${bill.breakdown.energy}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Delivery Charges</span>
                </div>
                <span className="font-bold">${bill.breakdown.delivery}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium">Taxes & Fees</span>
                </div>
                <span className="font-bold">${bill.breakdown.taxes}</span>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <h4 className="font-semibold text-gray-700 mb-2">Due Date</h4>
              <p className="text-lg font-bold text-gray-900">{new Date(bill.dueDate).toLocaleDateString()}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <h4 className="font-semibold text-gray-700 mb-2">Status</h4>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(bill.status)}`}>
                {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {bill.status === 'pending' && (
              <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Pay Now - ${bill.amount}
              </button>
            )}
            <button className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium">
              Download PDF
            </button>
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
            <h1 className="text-3xl font-bold text-gray-900">💰 Energy Bills</h1>
            <p className="text-gray-600 mt-1">Track your energy costs and payment history</p>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Set Budget Alert
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Bill</p>
                <p className="text-2xl font-bold text-gray-900">$156.80</p>
                <p className="text-xs text-red-500">Due in 5 days</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Monthly</p>
                <p className="text-2xl font-bold text-gray-900">$128.45</p>
                <p className="text-xs text-green-500">↓ 8% vs last year</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM4 10a6 6 0 1112 0v3.332l2.5 3.75A1 1 0 0117 18h-1.332l-2.5-3.75H6.832l-2.5 3.75A1 1 0 013 18h1.5l2.5-3.75V10z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Budget Alert</p>
                <p className="text-2xl font-bold text-gray-900">$150</p>
                <p className="text-xs text-yellow-500">97% of budget used</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Year to Date</p>
                <p className="text-2xl font-bold text-gray-900">$1,541</p>
                <p className="text-xs text-blue-500">12 months paid</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Monthly Trends */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" fontSize={12} />
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
                  dataKey="amount" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                  name="Amount ($)"
                />
                <Line 
                  type="monotone" 
                  dataKey="budget" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                  name="Budget ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Cost Breakdown */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Cost Breakdown</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={costBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {costBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [`${value}%`, name]}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {costBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">${item.amount}</div>
                    <div className="text-xs text-gray-500">{item.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bills History */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Bills</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bills.map((bill) => (
              <BillCard key={bill.id} bill={bill} />
            ))}
          </div>
        </div>

        {/* Bill Detail Modal */}
        {selectedBill && (
          <BillModal 
            bill={selectedBill} 
            onClose={() => setSelectedBill(null)} 
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
            <p className="text-gray-600 text-xs mt-1">All Rights Reserved.© 2025😶‍🌫️</p>
          </div>
        </div>
      </div>
    </div>
  );
}