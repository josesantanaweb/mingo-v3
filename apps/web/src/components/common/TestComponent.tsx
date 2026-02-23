'use client';

import { useState } from 'react';

interface TestComponentProps {
  title?: string;
  description?: string;
}

const TestComponent = ({
  title = 'Componente de Prueba',
  description = 'Este es un componente base de prueba',
}: TestComponentProps) => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <p className="text-gray-600 text-center">{description}</p>

      <div className="flex flex-col items-center space-y-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCount(count - 1)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            -
          </button>
          <span className="text-3xl font-semibold text-gray-800 min-w-[60px] text-center">
            {count}
          </span>
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            +
          </button>
        </div>

        <button
          onClick={() => setCount(0)}
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
};

export default TestComponent;
