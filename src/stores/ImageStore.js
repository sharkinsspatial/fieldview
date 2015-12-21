import alt from '../alt'
import ImageSource from '../sources/ImageSource'
import FieldActions from '../actions/FieldActions'
import ImageActions from '../actions/ImageActions'
import FieldStore from './FieldStore'
import _ from 'lodash'
//import moment from 'moment'

class ImageStore {
    constructor() {
        this.map = new Map()
        this.registerAsync(ImageSource)
        this.bindAction(ImageActions.updateImages, this.onUpdate)
        //this.bindAction(ImageActions.fetchingImages, this.onFetching)
        this.bindAction(ImageActions.setActiveImage, this.onSetActiveImage)
        this.bindAction(ImageActions.setActiveProduct, this.onSetActiveProduct)
        this.bindAction(FieldActions.setActiveField, this.getFieldImages)
        this.bindAction(ImageActions.getImages, this.getImages)
        this.state = { images: [], loading: false, dates: [] }
    }

    //onFetching() {
        //this.setState({loading: true})
    //}

    load(items) {
        let hasField = false
        let groupings = { farms: [], dates: [] }
        items.forEach((item) => {
            this.map.set(item.id, item)
            hasField = item.field ? true : false
        })
        if (hasField) {
            groupings.farms = _(items).pluck('field').unique('farmId').value()
            groupings.dates = _.sortBy(_.pluck(items,'collectionDate'), (value) => {return new Date(value)}).reverse()
        }
        return groupings
    }

    onUpdate(response) {
        let groupings = this.load(response.data)
        this.setState({ images: response.data, loading: false,
                      farms: groupings.farms, dates: groupings.dates })
    }

    onSetActiveImage(id) {
        let active = this.map.get(id)
        if (active) {
            this.setState({ activeImage: active, activeProduct: active.products[0] })
        }
        else {
            this.setState({ activeImage: null })
        }
    }

    onSetActiveProduct(id) {
        let activeProduct = this.state.activeImage.products.filter(item => {
            return id === item.id
        })[0]
        this.setState({ activeProduct: activeProduct })
    }

    getFieldImages(id) {
        //Don't hit API when user clicks an unauthorized Field.
        this.waitFor(FieldStore)
        if (FieldStore.getState().unauthorizedField) {
            this.setState({ fieldId: id, images: [], activeImage: null,
                      activeProduct: null, loading: false})
        }
        else {
            this.setState({ fieldId: id, images: [], activeImage: null,
                          activeProduct: null, loading: true})
            this.getInstance().fetchFieldImages()
        }
    }

    getImages() {
        this.setState({ images: [], activeImage: null,
                      activeProduct: null, loading: true })
        this.getInstance().fetchImages()
    }
}

const imageStore = alt.createStore(ImageStore, 'imageStore')

export default imageStore
