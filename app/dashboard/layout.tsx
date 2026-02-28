import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await getServerSession()

    if(!session){
        redirect("/sign-in")
    }

    return (
    <>
        {children}
    </>
    );
}
