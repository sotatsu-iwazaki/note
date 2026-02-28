import { SessionIcon } from "@/components/elements/SessionIcon";
import { getServerSession } from "@/lib/auth-server";

export default async function Page() {

    const session = await getServerSession()

    return(
        <div>
            dashboard
            <SessionIcon session={session}/>
        </div>
    )
}