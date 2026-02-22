"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 16,
            }}
        >
            <h1>Login</h1>

            <button
                onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                style={{
                    padding: "10px 20px",
                    cursor: "pointer",
                }}
            >
                Login con GitHub
            </button>

            <button
                onClick={() => signIn("facebook", { callbackUrl: "/dashboard" })}
                style={{
                    padding: "10px 20px",
                    cursor: "pointer",
                }}
            >
                Login con Facebook
            </button>
        </div>
    );
}