import { useState } from "react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">⚙️ Settings</h1>

        {/* Profile Settings */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Profile</h2>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 mb-3"
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Preferences */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Preferences</h2>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700">Enable Notifications</span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="w-5 h-5"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Dark Mode</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="w-5 h-5"
            />
          </div>
        </div>

        {/* Save Button */}
        <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          Save Changes
        </button>

        {/* Copyright Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center space-x-25 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl">
            <span className="text-white font-medium">Woven from circuits and imagination.<br /></span>
            <span className="text-white font-medium">by</span>
            <span className="text-white font-bold tracking-wide text-lg">Vanka Nikhil</span>
           <span className="text-white font-bold tracking-wide text-lg">&nbsp;and  Team🐦‍🔥</span>
            <span className="text-white/80 mx-2">•</span>
            <span className="text-white font-medium">Household Watch</span>
          </div><br />
          <div className="mt-4 bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/30 inline-block shadow-lg">
            <p className="text-gray-600 text-xs mt-1">All Rights Reserved.© 2025☠️</p>
          </div>
        </div>
      </div>
    </div>
  );
}
