import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 ">
            <Link
                className={"btn btn-outline btn-info text-base-content opacity-100"}
                href={"/home"}>Navigate to Main Content</Link>
        </main>
    );
}
