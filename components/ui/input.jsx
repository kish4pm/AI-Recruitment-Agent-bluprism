import React from 'react';

export default function Input({ className = '', ...props }) {
  return <input {...props} className={\`px-3 py-2 border rounded \${className}\`} />;
}
