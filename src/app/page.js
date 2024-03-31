import dynamic from "next/dynamic";

const Matrix = dynamic(() => import("@/components/matrix"), {
    loading: () => <p>loading...</p>,
    ssr: false,
});

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center ">
            <h1 className="text-4xl font-bold">Game of Life</h1>
            <Matrix />
        </main>
    );
}
