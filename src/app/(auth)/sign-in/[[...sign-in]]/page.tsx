import {SignIn} from "@clerk/nextjs";

export default function Page() {
    return (
        <main className={"justify-center items-center flex py-20"}>
            <SignIn path={"/sign-in"}/>
        </main>
    )

}