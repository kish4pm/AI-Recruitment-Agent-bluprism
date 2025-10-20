import React from 'react';
export default function Button({ children, className = '', ...props }) {
  return <button {...props} className={\`px-3 py-2 rounded bg-sky-600 text-white \${className}\`}>{children}</button>;
}
