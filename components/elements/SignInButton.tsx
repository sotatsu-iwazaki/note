"use client"

import { signIn } from "@/lib/auth-client"
import { Button } from "../ui/button"

export function SignInButton() {
    return(
        <Button
        variant="outline"
        onClick={() => signIn()}
        >
            Googleでログイン
        </Button>
    )
}