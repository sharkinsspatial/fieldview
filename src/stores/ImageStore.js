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
        this.bindAction(ImageActions.filterByDate, this.onFilterByDate)
        this.state = { images: [], loading: false, dates: [], dateFields: []}
    }

    //onFetching() {
        //this.setState({loading: true})
    //}

    load(items) {
        let hasField = false
        let dates = []
        items.forEach((item) => {
            this.map.set(item.id, item)
            hasField = item.field ? true : false
        })
        if (hasField) {
            dates = _.sortBy(_.pluck(items,'collectionDate'), (value) => {return new Date(value)}).reverse()
        }
        return dates
    }

    onUpdate(response) {
        let dates = this.load(response.data)
        this.setState({ images: response.data, loading: false,
                            dates: dates })
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
            if (this.state.activeDate) {
                let dateFieldImage = this.state.images.find((image) => {
                    let dateMatch = image.collectionDate === this.state.activeDate
                    let fieldMatch = image.fieldId === id
                    let match = dateMatch && fieldMatch ? true : false
                    return match
                })
                this.onSetActiveImage(dateFieldImage.id)
            } else {
                this.setState({ fieldId: id, images: [], activeImage: null,
                              activeProduct: null, loading: true})
                this.getInstance().fetchFieldImages()
            }
        }
    }

    getImages() {
        this.setState({ images: [], activeImage: null,
                      activeProduct: null, loading: true })
        this.getInstance().fetchImages()
    }

    onFilterByDate(date) {
        let dateImages = this.state.images.filter((image) => {
            return image.collectionDate === date
        })

        let dateFields = _(dateImages).pluck('field').unique('id').value()[0]
        this.setState({ dateFields: dateFields, activeDate: date })
    }
}

const imageStore = alt.createStore(ImageStore, 'imageStore')

export default imageStore
