import AuthForm from "./_components/AuthForm";

export default function Home() {
  return (
    <main className="min-h-screen p-24 bg-gray-50">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">random</h1>
        <AuthForm />
      </div>
    </main>
  );
}
