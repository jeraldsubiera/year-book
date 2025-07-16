import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch session from your custom session API
    async function checkSession() {
      const res = await fetch("http://localhost:8000/auth/session", {
        method: "GET",
        credentials: "include",  // send cookies cross-origin
      });
      if (res.ok) {
        const data = await res.json();
        setSession(data.user);
      }
    }
    checkSession();
  }, []);

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-blue-100 to-white">
      <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-xl text-center">
        <h1 className="text-2xl font-bold mb-6">Welcome Year Book</h1>
        <p className="mb-6 text-gray-500">Sign in to continue</p>

        <a href="http://localhost:8000/auth/google">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg w-full flex items-center justify-center gap-2">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google icon"
              className="w-5 h-5"
            />
            Sign in with Google
          </button>
        </a>

      </div>
    </div>
  );
}


// import { signIn, useSession } from "next-auth/react";
// import { useEffect } from "react";
// import { useRouter } from "next/router";

// export default function LoginPage() {
//   const { data: session } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (session) {
//       router.push("/dashboard"); // redirect if already logged in
//     }
//   }, [session, router]);

//   return (
//     <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-blue-100 to-white">
//       <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-xl text-center">
//         <h1 className="text-2xl font-bold mb-6">Welcome Year Book</h1>
//         <p className="mb-6 text-gray-500">Sign in to continue</p>
//         <button
//           onClick={() => signIn("google")}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg w-full flex items-center justify-center gap-2"
//         >
//           <img
//             src="https://www.svgrepo.com/show/475656/google-color.svg"
//             alt="Google icon"
//             className="w-5 h-5"
//           />
//           Sign in with Google
//         </button>
//         <div className="flex justify-center items-center h-screen bg-gray-100">
//             <a href="http://localhost:8000/auth/google">
//                 <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow">
//                 Login with Google
//                 </button>
//             </a>
//         </div>
//       </div>
//     </div>
//   );
// }
