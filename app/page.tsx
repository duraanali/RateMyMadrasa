import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to Rate My Madrasa</h1>
      <div className="flex space-x-4">
        <Link href="/signup" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Sign Up
        </Link>
        <Link href="/signin" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Sign In
        </Link>
      </div>
    </main>
  );
}
