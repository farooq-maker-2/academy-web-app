import {useRouter} from "next/router";
import HomeComponent from "../components/home/HomeComponent";

export default function Home() {
    const router = useRouter();


    return (
        // <main auth={auth}>
        //     {message}
        // </main>
        <main>
            {/*<h1>You are not logged in</h1>*/}
            <HomeComponent router={router}/>
        </main>
    )
}
