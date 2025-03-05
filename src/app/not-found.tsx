export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <h1 className="text-4xl font-bold text-accent-dark mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-6">The page you're looking for doesn't exist.</p>
      <a href="/" className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-full">
        Go back home
      </a>
    </div>
  );
} 