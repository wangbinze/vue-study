let baseUrl

export default {
    install(Vue, options) {
        console.log('Installed!', options)

        baseUrl = options.baseUrl
    }
}