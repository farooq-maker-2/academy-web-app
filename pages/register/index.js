import RegistrationForm from "../../components/form/RegistrationForm";
import {useRouter} from "next/router";

export default function Register() {

    const router = useRouter();
    return <RegistrationForm router={router}/>;
}

