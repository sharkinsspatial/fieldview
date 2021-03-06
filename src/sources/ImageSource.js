import axios from 'axios'
import ImageActions from '../actions/ImageActions'
import AuthenticationStore from '../stores/AuthenticationStore'
const rootUrl = 'apiUrl'
const ImageSource = {
    fetchFieldImages: {
        remote(state) {
            let auth = AuthenticationStore.getState()
            let url = `${rootUrl}api/customers/` +
                `${auth.customerId}/images?access_token=${auth.token}&filter[where][fieldId]=${state.fieldId}&filter[include]=products`
            return axios.get(url)
        },

        shouldFetch() {
            return true
        },

        success: ImageActions.updateFieldImages,
        error: ImageActions.imagesFailed
    },

    fetchDateImages: {
        remote() {
            let auth = AuthenticationStore.getState()
            let fieldInclude = {
                include: [{
                    relation:"field",
                    scope: {
                        include: {
                            relation:"farm"
                        }
                    }
                },
                {
                    relation:"products"
                }]
            }
            let url = `${rootUrl}api/customers/` +
                `${auth.customerId}/images?access_token=${auth.token}` +
                `&filter=${JSON.stringify(fieldInclude)}`
            return axios.get(url)
        },

        shouldFetch() {
            return true
        },

        success: ImageActions.updateDateImages,
        error: ImageActions.imagesFailed
    },

    fetchMapboxJSON: {
        remote(state) {
            let url = `https://api.mapbox.com/v4/infraredbaron.` +
                `${state.activeProduct.id}.json?access_token=` +
                `${state.mapboxToken}`

            return axios.get(url)
        },

        shouldFetch() {
            return true
        },

        success: ImageActions.updateMapboxJSON,
        error: ImageActions.sendMapboxError
    }
}

export default ImageSource
