import alt from '../alt'

class ImageActions {
    constructor() {
        this.generateActions('updateImages', 'imagesFailed', 'setActiveImage',
                             'setActiveProduct', 'getImages')
    }
}

const imageActions = alt.createActions(ImageActions)

export default imageActions
