import Navbar from "@/components/NavBar";
import { useState, useRef, useEffect } from "react";
import ViewTracker from "@/components/ViewTracker";
import Head from "next/head";

export default function CutePointsLeaderBoard() {
    const [data, setData] = useState([] as {name: string, avatar: string, cutepoints: number, user_id: number}[]);
    const hasRan = useRef(false);

    useEffect(() => {
        if (!hasRan.current) {
            hasRan.current = true
            fetch('/api/discord/cutepoints').then(x=> x.json()).then(data => {
                setData(data)
            }).catch(x => {
                alert('Error fetching cutepoints: ' + x)
                location.reload()
            })
        }
    })

    return (
        <div className="text-white text-center">
            <Head>
                <meta name="description" content="The cutepoint leaderboard for Programmer Astolfo's Discord server" />
                <meta name="author" content="Programmer Astolfo" />
                <meta name="theme-color" content="#FF77FF" />
                <title>The Cutepoint Leaderboard</title>
                <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4021488147419187"
                crossOrigin="anonymous"
                ></script>
            </Head>
            <a href="/discord">
                <p className="text-blue-600 underline">Return back to the Discord page</p>
            </a>
            <h1 className="text-3xl font-bold">The Cutepoint Leaderboard</h1>
            <table className="relative left-[50%] -translate-x-1/2">
                <thead>
                    <tr>
                        <th className="px-4"></th>
                        <th className="px-4">Name</th>
                        <th className="px-4">Cutepoints</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((x, i) => (
                        <tr key={x.user_id}>
                            <td className="px-4">
                                <img className="rounded-full" width={64} height={64} src={x.avatar} alt={`avatar of ${x.name}`} />
                            </td>
                            <td className="px-4">{x.name}</td>
                            <td className="px-4">{x.cutepoints}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <p>
                It can take upwards of 24 hours for this leaderboard to update. If you changed your nickname, it will update within 24 hours on the leaderboard.
            </p>
            <Navbar sel="" />
            <ViewTracker />
        </div>
    )

}