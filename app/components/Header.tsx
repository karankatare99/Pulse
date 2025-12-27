'use client'
import { signIn, signOut } from "next-auth/react"

export const Header = () => {
    return (
        <div className="flex justify-between w-full">
            <h1>Pulse</h1>
            <button onClick={() => signIn()}>Signin</button>
            <button onClick={() => signOut()}>Signout</button>
        </div>
    )
}