import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';
import { isGCSConfigured } from '../lib/googleStorage';

const SystemStatus: React.FC = () => {
  const supabaseConfigured = isSupabaseConfigured();
  const gcsConfigured = isGCSConfigured();
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 border max-w-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">System Status</h3>
        
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-gray-700">React App Running</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-gray-700">Components Loaded</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {supabaseConfigured ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <AlertCircle className="w-4 h-4 text-yellow-500" />
            )}
            <span className="text-gray-700">
              Supabase {supabaseConfigured ? 'Connected' : 'Demo Mode'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {gcsConfigured ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <AlertCircle className="w-4 h-4 text-yellow-500" />
            )}
            <span className="text-gray-700">
              Google Cloud Storage {gcsConfigured ? 'Configured' : 'Mock Data'}
            </span>
          </div>
        </div>
        
        {(!supabaseConfigured || !gcsConfigured) && (
          <div className="mt-3 p-2 bg-yellow-50 rounded text-xs text-yellow-800">
            {!supabaseConfigured && (
              <p><strong>Supabase Demo Mode:</strong> Configure Supabase for auth & loyalty</p>
            )}
            {!gcsConfigured && (
              <p><strong>Gallery Mock Data:</strong> Using placeholder images (GCS configured but not connected)</p>
            )}
          </div>
        )}
        
        <button
          onClick={() => document.querySelector('.system-status')?.remove()}
          className="mt-2 text-xs text-gray-500 hover:text-gray-700"
        >
          Hide Status
        </button>
      </div>
    </div>
  );
};

export default SystemStatus;