"use client"

import { getServerSession } from "@/lib/auth-server";
import { Avatar, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { signOut } from "@/lib/auth-client";
import { LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export function SessionIcon({ session }: { session: Awaited<ReturnType<typeof getServerSession>>}) {

    const router = useRouter()

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage
                    src={session?.user.image || ""}
                    alt="user image"
                    className="hover:brightness-90"
                    />
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuItem
                    onClick={() => {
                        router.push("/dashboard/settings")
                    }}
                    >
                        <Settings/>
                        設定
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem
                    onClick={() => {
                        signOut()
                    }}
                    >
                        <LogOut/>
                        ログアウト
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}