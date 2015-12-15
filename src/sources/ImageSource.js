import axios from 'axios'
import ImageActions from '../actions/ImageActions'
import AuthenticationStore from '../stores/AuthenticationStore'
const rootUrl = 'apiUrl'
const ImageSource = {
    fetchImages: {
        remote(state) {
            let auth = AuthenticationStore.getState()
            let url = `${rootUrl}api/customers/` +
                `${auth.customerId}/images?access_token=${auth.token}&filter[where][fieldId]=${state.fieldId}&filter[include]=products`
            return axios.get(url)
        },

        shouldFetch() {
            return true
        },

        success: ImageActions.updateImages,
        error: ImageActions.imagesFailed
    }
}

export default ImageSource
