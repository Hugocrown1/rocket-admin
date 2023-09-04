'use client'

import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession();


  if(!session){
    return (
      <div className="flex bg-blue-950 w-screen h-screen items-center justify-center ">
        <button onClick={() => signIn()} className="bg-white text-black p-4 rounded-md">Iniciar sesión con Google</button>
      </div>
    )
  }
  
  return (
    <div>logged in {session.user.email}</div>
  )
}
