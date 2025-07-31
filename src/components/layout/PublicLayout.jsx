// // src/components/layout/PublicLayout/PublicLayout.jsx
// import React from 'react';

// const PublicLayout = ({ children }) => {
//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
//       <header className="h-16 px-6 flex items-center justify-between bg-white border-b shadow-sm">
//         <h1 className="text-xl font-semibold text-blue-700">Promptica</h1>
//         <button
//           className="text-sm text-blue-600 hover:underline"
//           onClick={() => {
//             // logout logic
//             localStorage.clear();
//             window.location.href = '/login';
//           }}
//         >
//           Log Out
//         </button>
//       </header>

//       <main className="flex-1 p-4 max-w-4xl mx-auto w-full">{children}</main>

//       <footer className="h-12 px-6 flex items-center justify-center bg-white border-t text-sm text-gray-500">
//         &copy; {new Date().getFullYear()} Promptica. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default PublicLayout;
