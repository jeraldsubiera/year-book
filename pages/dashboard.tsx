import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Fetch session on mount
  useEffect(() => {
    async function fetchSession() {
      const res = await fetch("http://localhost:8000/auth/session", {
        method: "GET",
        credentials: "include",  // send cookies cross-origin
      });
      if (res.ok) {
        console.log("res.ok", res.ok);
        const data = await res.json();
        setUser(data.user);
      } else {
        router.push("/"); // Redirect to login if no session
      }
    }
    fetchSession();
  }, [router]);

  if (!user) return <div>Loading...</div>;

  async function handleLogout() {
    await fetch("http://localhost:8000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/"; // redirect to login/home page
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {user}</p>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}


// import { useSession, signOut } from "next-auth/react";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

// export default function Dashboard() {
//   const { data: session } = useSession();
//   const router = useRouter();

//     useEffect(() => {
//     if (!session) {
//       router.push("/"); // redirect if already logged in
//     }
//   }, [session, router]);

//   if (!session) return;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Dashboard</h1>
//       <p>Welcome, {session.user?.name}</p>
//       <button
//         onClick={() => 
//                 signOut()
//             }
//         className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }