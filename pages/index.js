import {useRouter} from "next/router";
import HomeComponent from "./home";

export default function Home() {
    const router = useRouter();

    return (
        <main>
            <HomeComponent/>
        </main>
    )
}
