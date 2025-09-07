export default function Footer() {
  return (
    <footer className="mt-12 py-8 text-center">
      <div className="max-w-4xl mx-auto px-6">
        {/* Decorative Line */}
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-6"></div>
        
        {/* Main Footer Content */}
        <div className="space-y-3">
          <p className="text-lg font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Woven from circuits and imagination.
          </p>
          
          <div className="text-gray-600">
            <p className="text-sm">
              © 2025 <span className="font-semibold text-indigo-600">Vanka Nikhil</span> and <span className="font-semibold text-purple-600">Team Household Watch</span>.
            </p>
            <p className="text-xs mt-1">All Rights Reserved.</p>
          </div>
        </div>
        
        {/* Bottom Decorative Line */}
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mt-6"></div>
      </div>
    </footer>
  );
}