export default function SimplePage() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Simple Page</h1>
      <p>This is a server component page without any client components.</p>
      <a href="/" className="text-blue-500 hover:underline mt-4 inline-block">
        Go back to home page
      </a>
    </div>
  );
} 