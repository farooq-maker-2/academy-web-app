module.exports = {
    reactStrictMode: true,

    serverRuntimeConfig: {
        // Will only be available on the server side
        serverBaseUrl: 'http://192.168.50.134:8081'
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        serverBaseUrl: 'http://localhost:8081'
    }
}
