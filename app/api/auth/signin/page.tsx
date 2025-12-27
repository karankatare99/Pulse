'use client'

import { signIn } from "next-auth/react"


export default function SigninPage() {
    return (
        <div>
            <h1>Custom signin page</h1>
            <button onClick={() => signIn('google')}>
                Signin with google
            </button>
        </div>
    )
}