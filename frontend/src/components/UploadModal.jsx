import React from 'react';

import { UploadCloud, X } from 'lucide-react';

const UploadModal = ({ isOpen, onClose }) => {
  return (
    
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
        >
          <div
            className="bg-white dark:bg-dark-surface w-full max-w-md rounded-sm overflow-hidden border border-gray-200 dark:border-gray-800"
          >
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <h3 className="font-bold text-lg">Upload Assignment</h3>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <X className="w-5 h-5"/>
              </button>
            </div>
            <div className="p-6 text-center">
              <div className="border-2 border-dashed border-primary/30 rounded-sm p-8 hover:bg-primary/5 cursor-pointer group">
                <UploadCloud className="w-12 h-12 text-primary/50 mx-auto mb-3 group-hover:text-primary" />
                <p className="font-medium text-gray-700 dark:text-gray-300">Drag & drop your files here</p>
                <p className="text-sm text-gray-500 mt-1">or click to browse from computer</p>
                <p className="text-xs text-gray-400 mt-4">Supported formats: PDF, DOCX, ZIP (Max 10MB)</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3">
              <button onClick={onClose} className="px-4 py-2 rounded-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800">
                Cancel
              </button>
              <button className="px-4 py-2 rounded-sm font-medium bg-primary text-white hover:bg-blue-700 -primary/30">
                Submit Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    
  );
};

export default UploadModal;
