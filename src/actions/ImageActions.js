import alt from '../alt'

class ImageActions {
    constructor() {
        this.generateActions('setActiveImage', 'setActiveProduct',
                             'setActiveDate', 'getDateImages',
                             'updateFieldImages', 'updateDateImages',
                             'clearActiveDate', 'imagesFailed',
                             'clearFieldImages')
    }
}

const imageActions = alt.createActions(ImageActions)

export default imageActions
