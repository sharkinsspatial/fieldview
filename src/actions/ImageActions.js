import alt from '../alt'

class ImageActions {
    constructor() {
        this.generateActions('setActiveImage', 'setActiveProduct',
                             'setActiveDate', 'getDateImages',
                             'updateFieldImages', 'updateDateImages',
                             'clearActiveDate', 'imagesFailed',
                             'clearFieldImages', 'sendMapboxError',
                             'updateMapboxJSON', 'setMapView',
                             'addCompareImage', 'clearCompareImages',
                             'setMapCompareView', 'setActiveProductType')
    }
}

const imageActions = alt.createActions(ImageActions)

export default imageActions
