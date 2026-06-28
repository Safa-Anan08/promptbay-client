
import Link from "next/link";

export default function NotFound() {
    return (

     <div className="min-h-screen flex items-center justify-center px-6">

      <div className="text-center">
       <h1 className="text-8xl font-black">
       404
       </h1>

     <h2 className="text-3xl font-bold mt-4">
      Page Not Found
     </h2>

     <p className="mt-3 opacity-70">
      This page does not exist.
     </p>

     <Link
     href="/"
     className="inline-block mt-8 px-8 py-4 rounded-2xl bg-blue-600 text-white"
     >
      Back Home
      </Link>

    </div>

    </div>

   );
  }