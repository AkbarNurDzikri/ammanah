import LoginForm from "./components/login-form";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-zinc-50 dark:bg-zinc-950">
      {/* Left Column: Branding (Visible on md and up) */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-zinc-900 group">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-zinc-900 to-teal-900/40 z-10" />

        {/* Animated Background Elements */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute bottom-0 -right-4 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />

        <div className="relative z-20 flex flex-col items-center justify-center w-full p-12 text-center text-white">
          <Link
            href="/"
            className="mb-12 transform transition-transform duration-500 hover:scale-105"
          >
            <Image
              src="/ammanah-full.png"
              alt="Ammanah Logo"
              width={280}
              height={80}
              className="drop-shadow-2xl"
              priority
            />
          </Link>

          <div className="max-w-md space-y-6">
            <h2 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-200 to-teal-100">
              Welcome Back to Ammanah
            </h2>
            <p className="text-lg text-zinc-300 font-medium">
              Manage your community records with confidence and integrity.
            </p>
            <div className="pt-8 flex justify-center gap-4">
              <div className="h-1 w-12 rounded-full bg-emerald-500/50" />
              <div className="h-1 w-4 rounded-full bg-emerald-500/30" />
              <div className="h-1 w-2 rounded-full bg-emerald-500/20" />
            </div>
          </div>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-500/10 to-transparent" />
      </div>

      {/* Right Column: Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="md:hidden flex flex-col items-center mb-8">
            <Image
              src="/ammanah.png"
              alt="Ammanah Logo"
              width={64}
              height={64}
              className="mb-4"
            />
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              Welcome back
            </h1>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl dark:shadow-emerald-900/10 border border-zinc-100 dark:border-zinc-800 backdrop-blur-sm">
            <div className="hidden md:block mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Sign In
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                Enter your details to access your dashboard
              </p>
            </div>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
