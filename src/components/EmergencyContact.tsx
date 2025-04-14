
import React from 'react';
import { cn } from '@/lib/utils';
import { Phone, User, Shield, AlertTriangle } from 'lucide-react';
import { useTheme } from '../context/ThemeProvider';

interface EmergencyContactProps {
  name: string;
  role: string;
  phone: string;
  contactId: string;
  available: boolean;
  className?: string;
}

const EmergencyContact: React.FC<EmergencyContactProps> = ({
  name,
  role,
  phone,
  contactId,
  available = true,
  className,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  
  const getIcon = () => {
    if (role.toLowerCase().includes('medical')) {
      return <Shield size={16} className="text-red-400" />;
    } else if (role.toLowerCase().includes('coordinator')) {
      return <Shield size={16} className="text-blue-400" />;
    } else {
      return <User size={16} />;
    }
  };

  const handleCall = () => {
    // In a real app, this would use the device's native calling capabilities
    console.log(`Calling ${name}: ${phone}`);
    alert(`In a real emergency, this would call ${phone}`);
  };

  return (
    <div 
      className={cn(
        'rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md',
        isLight 
          ? 'bg-white border border-gray-200' 
          : 'bg-black/40 backdrop-blur-sm border border-white/10',
        className
      )}
    >
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center mr-3",
            isLight ? "bg-gray-100" : "bg-white/10"
          )}>
            {getIcon()}
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className={cn("text-xs", isLight ? "text-gray-600" : "text-gray-400")}>{role}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center">
            <Phone size={14} className={cn("mr-1.5", isLight ? "text-gray-600" : "text-gray-400")} />
            <span className={cn("text-sm", isLight ? "text-gray-800" : "text-gray-300")}>{phone}</span>
          </div>
          
          <div 
            className={cn(
              "text-xs px-2 py-0.5 rounded-full",
              available
                ? (isLight ? "bg-green-100 text-green-800" : "bg-green-900/30 text-green-400 border border-green-800/50")
                : (isLight ? "bg-red-100 text-red-800" : "bg-red-900/30 text-red-400 border border-red-800/50")
            )}
          >
            {available ? "Available" : "Unavailable"}
          </div>
        </div>
        
        <button
          onClick={handleCall}
          className={cn(
            "w-full mt-3 py-1.5 rounded-full text-sm font-medium transition-colors",
            isLight 
              ? "bg-black text-white hover:bg-black/90" 
              : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
          )}
        >
          Call Now
        </button>
      </div>
    </div>
  );
};

export default EmergencyContact;
