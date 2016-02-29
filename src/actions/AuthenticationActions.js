import alt from '../alt'

class AuthenticationActions {
    constructor() {
        this.generateActions('fetchToken', 'updateToken', 'tokenFailed',
                            'setCurrentCustomer')
    }
}

const authenticationActions = alt.createActions(AuthenticationActions)

export default authenticationActions
