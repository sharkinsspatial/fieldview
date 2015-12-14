import alt from '../alt'
import AuthenticationSource from '../sources/AuthenticationSource'
import AuthenticationActions from '../actions/AuthenticationActions'

class AuthenticationStore {
    constructor() {
        this.state = {}
        this.registerAsync(AuthenticationSource)
        this.bindAction(AuthenticationActions.fetchToken, this.onFetchToken)
        this.bindAction(AuthenticationActions.tokenFailed, this.onTokenFailed)
        this.bindAction(AuthenticationActions.updateToken, this.onUpdateToken)

        this.exportPublicMethods({
            isLoggedIn: this.isLoggedIn
        })
    }

    onUpdateToken(response) {
        this.setState({ token: response.data.id, customerId: response.data.customerId})
    }

    onFetchToken(credentials) {
        this.setState({ credentials: credentials })
        this.getInstance().fetchToken()
    }

    onTokenFailed(response) {
        this.setState({ loginError: true, loginErrorMessage:
                      response.data.error.message })
    }

    isLoggedIn() {
        return !!this.state.token
    }
}

const authenticationStore = alt.createStore(AuthenticationStore, 'authStore')

export default authenticationStore
