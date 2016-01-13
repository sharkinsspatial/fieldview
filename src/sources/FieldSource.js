import axios from 'axios'
import FieldActions from '../actions/FieldActions'
import AuthenticationStore from '../stores/AuthenticationStore'
const rootUrl = 'apiUrl'
const FieldSource = {
    fetchFields: {
        remote(state) {
            let auth = AuthenticationStore.getState()
            let url = `${rootUrl}api/customers/` +
                `${auth.customerId}/fields?access_token=${auth.token}&filter[order]=name&filter[include]=farm`
            return axios.get(url)
        },
        local(state) {
            return state.fields.size > 0 ? state.fields : null
        },

        success: FieldActions.updateFields,
        error: FieldActions.fieldsFailed
    }
}

export default FieldSource
