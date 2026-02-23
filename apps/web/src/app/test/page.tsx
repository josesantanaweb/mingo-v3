'use client';

import { TestComponent } from '@/components/common';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="space-y-6">
        <TestComponent />

        <TestComponent
          title="Componente Personalizado"
          description="Este componente tiene props personalizadas"
        />
      </div>
    </div>
  );
}
