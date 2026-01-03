import RegisterForm from "./components/register-form";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row-reverse bg-zinc-50 dark:bg-zinc-950">
      {/* Side Column: Branding (Visible on md and up) */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-zinc-900 group">
        <div className="absolute inset-0 bg-gradient-to-bl from-teal-600/20 via-zinc-900 to-emerald-900/40 z-10" />

        {/* Animated Background Elements */}
        <div className="absolute top-0 -right-4 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute bottom-0 -left-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />

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
            <h2 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-emerald-100">
              Join the Ammanah Community
            </h2>
            <p className="text-lg text-zinc-300 font-medium">
              Start managing your data with transparency and ease.
            </p>
            <div className="pt-8 flex justify-center gap-4">
              <div className="h-1 w-2 rounded-full bg-teal-500/20" />
              <div className="h-1 w-4 rounded-full bg-teal-500/30" />
              <div className="h-1 w-12 rounded-full bg-teal-500/50" />
            </div>
          </div>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-teal-500/10 to-transparent" />
      </div>

      {/* Main Column: Form */}
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
              Create an account
            </h1>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl dark:shadow-teal-900/10 border border-zinc-100 dark:border-zinc-800 backdrop-blur-sm">
            <div className="hidden md:block mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Register
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                Join us to start managing your records
              </p>
            </div>

            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
