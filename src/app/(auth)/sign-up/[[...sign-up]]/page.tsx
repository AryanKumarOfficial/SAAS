import React from "react";
import {SignUp} from "@clerk/nextjs";

export default function Page() {
    return (
        <main className={"justify-center items-center flex py-20"}>
            <SignUp path={"/sign-up"}/>
        </main>
    )
}