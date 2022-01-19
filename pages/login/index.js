import LoginForm from "../../components/form/LoginForm";
import {useRouter} from "next/router";

export default function Login() {

    const router = useRouter();
    return <LoginForm router={router}/>;
}
