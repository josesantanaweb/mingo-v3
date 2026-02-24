import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="rounded-2xl border border-gray-700 bg-gray-800 p-8 shadow-xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

