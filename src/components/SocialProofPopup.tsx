import { useState, useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const notifications = [
  { name: 'James M.', action: 'rented a 3-bed apartment', location: 'Kabulonga', time: '2 mins ago' },
  { name: 'Grace C.', action: 'listed a property for sale', location: 'Rhodespark', time: '5 mins ago' },
  { name: 'Peter K.', action: 'booked a student bedspace', location: 'near UNZA', time: '8 mins ago' },
  { name: 'Mary B.', action: 'found a tenant in 2 days', location: 'Woodlands', time: '12 mins ago' },
  { name: 'David N.', action: 'sold a house', location: 'Chalala', time: '15 mins ago' },
  { name: 'Sarah P.', action: 'rented an office space', location: 'CBD', time: '18 mins ago' },
  { name: 'John M.', action: 'verified their property', location: 'Avondale', time: '22 mins ago' },
  { name: 'Ruth K.', action: 'found a flatmate', location: 'Roma', time: '25 mins ago' },
];

export function SocialProofPopup() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    return () => clearTimeout(showTimer);
  }, [isDismissed]);

  useEffect(() => {
    if (isDismissed) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length);
        setIsVisible(true);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, [isDismissed]);

  if (isDismissed) return null;

  const notification = notifications[currentIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-6 z-50 max-w-xs"
        >
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 relative">
            <button
              onClick={() => setIsDismissed(true)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-start space-x-3 pr-4">
              <div className="w-10 h-10 rounded-full bg-[#52a447]/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-[#52a447]" />
              </div>
              <div>
                <p className="text-sm text-gray-900">
                  <span className="font-semibold">{notification.name}</span>{' '}
                  {notification.action} in{' '}
                  <span className="font-semibold">{notification.location}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
            </div>
            <div className="flex items-center mt-2 pt-2 border-t border-gray-50">
              <div className="w-1.5 h-1.5 bg-[#52a447] rounded-full animate-pulse mr-2" />
              <span className="text-[11px] text-gray-400">
                {Math.floor(Math.random() * 50 + 120)} people viewing properties now
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
