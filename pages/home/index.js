import HomeComponent from "../../components/home/HomeComponent";
import {useRouter} from "next/router";


export default function Home() {

    const router = useRouter();
    return <HomeComponent router={router}/>;
}