"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"

export function DashboardButton() {

    const router = useRouter()

    return(
        <Button onClick={() => {
            router.push("/dashboard")
        }}>
            ダッシュボードへ
            <ArrowRight/>
        </Button>
    )
}