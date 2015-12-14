import axios from 'axios'
import AuthenticationActions from '../actions/AuthenticationActions'
let rootUrl = 'apiUrl'

const AuthenticationSource = {
    fetchToken: {
        remote(state) {
            let url = rootUrl + 'api/CustomerMembers/login'
            return axios.post(url, state.credentials)
        },

        local(state) {
            return state.token ? state.user : null
        },

        success: AuthenticationActions.updateToken,
        error: AuthenticationActions.tokenFailed
    }
}

export default AuthenticationSource
