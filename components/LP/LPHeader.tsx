import { getServerSession } from "@/lib/auth-server"
import { DashboardButton } from "../elements/DashboardButton"
import { SignInButton } from "../elements/SignInButton"

export async function LPHeader() {

    const session = await getServerSession()

    return(
        <header className="w-full h-20 border-b border-neutral-200 shadow-xs flex justify-between">
            <div className="w-64">
                a
            </div>
            <div className="w-64 flex items-center justify-center">
                {session ? (
                    <DashboardButton/>
                ) : (
                    <SignInButton/>
                )}
            </div>
        </header>
    )
}