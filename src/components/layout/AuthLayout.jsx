
// src/components/layout/AuthLayout.jsx
import React from 'react';
import Card from '../ui/Card/Card';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center px-4 text-center">
      <Card
        padding="lg"
        shadow="lg"
        className="w-full max-w-md"
      >

        {children}
      </Card>
    </div>
  );
};

export default AuthLayout;
