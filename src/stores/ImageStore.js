import alt from '../alt'
import ImageSource from '../sources/ImageSource'
import FieldActions from '../actions/FieldActions'
import ImageActions from '../actions/ImageActions'
//import moment from 'moment'

class ImageStore {
    constructor() {
        this.map = new Map()
        this.registerAsync(ImageSource)
        this.bindAction(ImageActions.updateImages, this.onUpdate)
        this.bindAction(ImageActions.fetchingImages, this.onFetching)
        this.bindAction(ImageActions.setActiveImage, this.onSetActive)
        //this.bindAction(ImageActions.getFields, this.onGetFields)
        this.bindAction(FieldActions.setActiveField, this.getImages)
        this.state = { images: [], loading: false }
    }

    onFetching() {
        this.setState({loading: true})
    }

    load(items) {
        items.forEach((item) => {
            this.map.set(item.id, item)
        })
    }

    onUpdate(response) {
        this.load(response.data)
        this.setState({ images: response.data, loading: false })
    }

    onSetActive(id) {
        let active = this.map.get(id)
        if (active) {
            this.setState({ activeImage: active})
        }
        else {
            this.setState({ activeImage: null })
        }
    }

    getImages(id) {
        //if (!this.getInstance().isLoading()) {
        this.setState({ fieldId: id})
            this.getInstance().fetchImages()
        //}
    }
}

const imageStore = alt.createStore(ImageStore, 'imageStore')

export default imageStore
