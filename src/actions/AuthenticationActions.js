import alt from '../alt'

class AuthenticationActions {
    constructor() {
        this.generateActions('fetchToken', 'updateToken', 'tokenFailed')
    }
}

const authenticationActions = alt.createActions(AuthenticationActions)

export default authenticationActions
