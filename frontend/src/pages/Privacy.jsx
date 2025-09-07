import { useState } from "react";

export default function Privacy() {
  const [activeSection, setActiveSection] = useState('overview');
  const [privacySettings, setPrivacySettings] = useState({
    dataCollection: true,
    personalizedAds: false,
    analyticsSharing: true,
    thirdPartySharing: false,
    locationTracking: false,
    cookiePreferences: 'essential'
  });

  const updatePrivacySetting = (key, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-start justify-between p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
      <div className="flex-1 mr-4">
        <h4 className="font-semibold text-gray-900 mb-2">{label}</h4>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          enabled ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );

  const SectionCard = ({ title, children, icon, description }) => (
    <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <span className="text-xl">{icon}</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        </div>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Privacy Dashboard */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">Your Privacy at a Glance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Data Protection</span>
            </div>
            <p className="text-sm opacity-90">Your personal data is encrypted and secure</p>
          </div>
          
          <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Control</span>
            </div>
            <p className="text-sm opacity-90">You control what data is collected</p>
          </div>
          
          <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Transparency</span>
            </div>
            <p className="text-sm opacity-90">Clear information about data usage</p>
          </div>
        </div>
      </div>

      {/* Quick Privacy Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Data Usage Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Energy consumption data</span>
              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">Local only</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Device information</span>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Encrypted</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Usage patterns</span>
              <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Anonymized</span>
            </div>
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            View Detailed Report
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">🔒 Privacy Score</h3>
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="#e5e7eb" strokeWidth="4" fill="transparent" />
                <circle cx="32" cy="32" r="28" stroke="#10b981" strokeWidth="4" fill="transparent" strokeDasharray="175.929" strokeDashoffset="35.186" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-green-600">85</span>
              </div>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Good Privacy Protection</p>
              <p className="text-sm text-gray-600">Most settings optimized for privacy</p>
            </div>
          </div>
          <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Improve Score
          </button>
        </div>
      </div>
    </div>
  );

  const renderDataCollection = () => (
    <div className="space-y-6">
      <SectionCard
        title="Data Collection Preferences"
        icon="📊"
        description="Control what information we collect about your energy usage"
      >
        <ToggleSwitch
          enabled={privacySettings.dataCollection}
          onChange={(value) => updatePrivacySetting('dataCollection', value)}
          label="Energy Usage Analytics"
          description="Allow collection of energy consumption data to provide personalized insights and recommendations for energy savings."
        />
        
        <ToggleSwitch
          enabled={privacySettings.analyticsSharing}
          onChange={(value) => updatePrivacySetting('analyticsSharing', value)}
          label="Anonymous Usage Statistics"
          description="Share anonymized usage patterns to help improve the service for all users. No personal information is included."
        />
        
        <ToggleSwitch
          enabled={privacySettings.locationTracking}
          onChange={(value) => updatePrivacySetting('locationTracking', value)}
          label="Location-Based Services"
          description="Use your location to provide weather-based energy recommendations and local utility rate information."
        />
      </SectionCard>

      <SectionCard
        title="Device Information"
        icon="🔌"
        description="How we handle information from your connected devices"
      >
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">What We Collect</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Device model and firmware version</li>
            <li>• Energy consumption readings</li>
            <li>• Device status and health information</li>
            <li>• Usage schedules and patterns</li>
          </ul>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-2">How We Protect It</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• End-to-end encryption for all data transmission</li>
            <li>• Local processing when possible</li>
            <li>• Regular security audits and updates</li>
            <li>• No sale of personal data to third parties</li>
          </ul>
        </div>
      </SectionCard>
    </div>
  );

  const renderSharing = () => (
    <div className="space-y-6">
      <SectionCard
        title="Third-Party Sharing"
        icon="🔗"
        description="Control how your data is shared with external services"
      >
        <ToggleSwitch
          enabled={privacySettings.thirdPartySharing}
          onChange={(value) => updatePrivacySetting('thirdPartySharing', value)}
          label="Smart Home Integration"
          description="Share necessary device data with Google Home, Amazon Alexa, and other smart home platforms you connect."
        />
        
        <ToggleSwitch
          enabled={privacySettings.personalizedAds}
          onChange={(value) => updatePrivacySetting('personalizedAds', value)}
          label="Personalized Advertisements"
          description="Allow use of your energy preferences to show relevant product recommendations and energy-saving offers."
        />
      </SectionCard>

      <SectionCard
        title="Data Partners"
        icon="🤝"
        description="Learn about our trusted partners and data sharing practices"
      >
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Utility Companies</h4>
                <p className="text-sm text-gray-600">Share usage data for billing and grid optimization</p>
              </div>
              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">Required</span>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Weather Services</h4>
                <p className="text-sm text-gray-600">Location data for weather-based recommendations</p>
              </div>
              <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Optional</span>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Analytics Providers</h4>
                <p className="text-sm text-gray-600">Anonymized usage data for service improvement</p>
              </div>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Anonymized</span>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );

  const renderRights = () => (
    <div className="space-y-6">
      <SectionCard
        title="Your Rights"
        icon="⚖️"
        description="Understand and exercise your privacy rights"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-3">Access Your Data</h4>
            <p className="text-sm text-blue-700 mb-3">Request a copy of all personal data we have about you.</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Request Data Copy
            </button>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-3">Correct Your Data</h4>
            <p className="text-sm text-green-700 mb-3">Update or correct any inaccurate information.</p>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
              Update Information
            </button>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-3">Limit Processing</h4>
            <p className="text-sm text-yellow-700 mb-3">Restrict how we process your personal data.</p>
            <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm">
              Manage Processing
            </button>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-900 mb-3">Delete Your Data</h4>
            <p className="text-sm text-red-700 mb-3">Permanently delete your account and all data.</p>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
              Delete Account
            </button>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Privacy Compliance"
        icon="📋"
        description="Our commitment to privacy regulations"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
              <span className="text-xl">🇪🇺</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">GDPR Compliant</h4>
            <p className="text-sm text-gray-600">Full compliance with European privacy regulations</p>
          </div>
          
          <div className="text-center p-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
              <span className="text-xl">🇺🇸</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">CCPA Compliant</h4>
            <p className="text-sm text-gray-600">Meets California Consumer Privacy Act standards</p>
          </div>
          
          <div className="text-center p-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
              <span className="text-xl">🔒</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">SOC 2 Certified</h4>
            <p className="text-sm text-gray-600">Certified for security and data protection</p>
          </div>
        </div>
      </SectionCard>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">🔒 Privacy Center</h1>
          <p className="text-gray-600 mt-1">Manage your privacy settings and understand how your data is protected</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'overview', label: 'Overview', icon: '👁️' },
              { id: 'collection', label: 'Data Collection', icon: '📊' },
              { id: 'sharing', label: 'Sharing & Partners', icon: '🔗' },
              { id: 'rights', label: 'Your Rights', icon: '⚖️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeSection === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="mb-8">
          {activeSection === 'overview' && renderOverview()}
          {activeSection === 'collection' && renderDataCollection()}
          {activeSection === 'sharing' && renderSharing()}
          {activeSection === 'rights' && renderRights()}
        </div>

        {/* Save Settings Button */}
        <div className="flex justify-end space-x-4">
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
            Reset to Defaults
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Save Privacy Settings
          </button>
        </div>
        {/* Copyright Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl">
            <span className="text-white font-medium">Woven from circuits and imagination.</span>
            <span className="text-white font-medium">by</span>
            <span className="text-white font-bold tracking-wide text-lg">Vanka Nikhil</span>
           <span className="text-white font-bold tracking-wide text-lg">and Team🐦‍🔥</span>
            <span className="text-white/80 mx-2">•</span>
            <span className="text-white font-medium">Household Watch</span>
          </div><br />
          <div className="mt-1 bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 inline-block shadow-lg">
            <p className="text-gray-600 text-xs mt-1">All Rights Reserved.© 2025🔏</p>
          </div>
        </div>
      </div>
    </div>
  );
}