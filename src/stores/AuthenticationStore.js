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
        this.bindAction(AuthenticationActions.setCurrentCustomer,
                        this.onSetCurrentCustomer)
        this.state = { customers: [] }

        this.exportPublicMethods({
            isLoggedIn: this.isLoggedIn
        })
    }

    onUpdateToken(response) {
        var customerId = null
        var customers = []
        if (response.data.customers.length === 1) {
            customerId = response.data.customers[0].id
        }
        if (response.data.customers.length > 1) {
            customers = response.data.customers
        }
        this.setState({ token: response.data.id, customerId, customers,
                      logo: response.data.logo })
    }

    onFetchToken(credentials) {
        this.setState({ credentials })
        this.getInstance().fetchToken()
    }

    onTokenFailed(response) {
        this.setState({ loginError: true, loginErrorMessage:
                      response.data.error.message })
    }

    isLoggedIn() {
        return !!this.state.token
    }

    onSetCurrentCustomer(id) {
        this.setState({ customerId: id })
    }
}

const authenticationStore = alt.createStore(AuthenticationStore, 'authStore')

export default authenticationStore
