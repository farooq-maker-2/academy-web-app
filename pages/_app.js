import '../styles/globals.css'
//import classes from '../components/RegistrationForm.module.css';

import Layout from "../layouts/Layout";

function MyApp({Component, pageProps}) {

    return <Layout>
        <Component {...pageProps} />
    </Layout>;
}

export default MyApp;
