"use client";

import { signIn } from "next-auth/react";
import React from "react";

const Login = () => {
  return (
    <div className="flex bg-black w-screen h-screen items-center justify-center ">
      <button
        onClick={() =>
          signIn("google", {
            redirect: true,
            callbackUrl: "/",
          })
        }
        className="bg-white text-black p-4 rounded-md"
      >
        Iniciar sesión con Google
      </button>
    </div>
  );
};

export default Login;
