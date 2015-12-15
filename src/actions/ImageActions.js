import alt from '../alt'

class ImageActions {
    constructor() {
        this.generateActions('updateImages', 'imagesFailed',
                             'fetchingImages', 'setActiveImage')
    }
}

const imageActions = alt.createActions(ImageActions)

export default imageActions
