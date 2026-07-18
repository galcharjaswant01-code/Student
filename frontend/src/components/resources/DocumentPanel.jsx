import React, { useEffect, useState } from 'react';

import { FileText, Download, MoreVertical, File, FileCode } from 'lucide-react';
import resourcesApi from '../../services/resourcesApi';

const getFileIcon = (type) => {
  switch(type) {
    case 'PDF': return <FileText className="w-8 h-8 text-red-500" />;
    case 'DOCX': return <File className="w-8 h-8 text-blue-500" />;
    case 'CSV': return <FileCode className="w-8 h-8 text-emerald-500" />;
    default: return <File className="w-8 h-8 text-gray-500" />;
  }
};

const getFileBg = (type) => {
  switch(type) {
    case 'PDF': return 'bg-red-50 dark:bg-red-500/10';
    case 'DOCX': return 'bg-blue-50 dark:bg-blue-500/10';
    case 'CSV': return 'bg-emerald-50 dark:bg-emerald-500/10';
    default: return 'bg-gray-50 dark:bg-gray-800';
  }
};

const DocumentPanel = () => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    resourcesApi.getDocuments().then(setDocs);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-sm p-6 -[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 dark:border-gray-700/50 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900 dark:text-white">Recent Documents</h3>
        <button className="text-sm text-blue-600 hover:text-blue-500 font-medium">View All</button>
      </div>

      <div className="flex flex-col gap-4">
        {docs.map((doc, index) => (
          <div 
            key={doc.id}
            className="flex items-center justify-between p-3 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 group cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-sm flex items-center justify-center shrink-0 ${getFileBg(doc.type)}`}>
                {getFileIcon(doc.type)}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1 group-hover:text-blue-600">
                  {doc.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <span>{doc.size}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                  <span>{doc.date}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100">
              <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-sm">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-900 rounded-sm">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentPanel;
