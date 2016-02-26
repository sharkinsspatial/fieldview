import alt from '../alt'
import ImageSource from '../sources/ImageSource'
import FieldActions from '../actions/FieldActions'
import ImageActions from '../actions/ImageActions'
import FieldStore from './FieldStore'
import sortby from 'lodash.sortby'
import pluck from 'lodash.pluck'
import uniqby from 'lodash.uniqby'
import reverse from 'lodash.reverse'

class ImageStore {
    constructor() {
        this.registerAsync(ImageSource)
        this.bindAction(ImageActions.setActiveImage, this.onSetActiveImage)
        this.bindAction(ImageActions.setActiveProduct, this.onSetActiveProduct)
        this.bindAction(FieldActions.setActiveField, this.onSetActiveField)
        this.bindAction(FieldActions.setActiveFarm, this.onSetActiveFarm)
        this.bindAction(ImageActions.setActiveDate, this.onSetActiveDate)
        this.bindAction(ImageActions.getDateImages, this.getDateImages)
        this.bindAction(ImageActions.updateFieldImages, this.onUpdateFieldImages)
        this.bindAction(ImageActions.updateDateImages, this.onUpdateDateImages)
        this.bindAction(ImageActions.clearActiveDate, this.onClearActiveDate)
        this.bindAction(ImageActions.clearFieldImages, this.onClearFieldImages)
        this.bindAction(ImageActions.sendMapboxError, this.onSendMapboxError)
        this.state = { loading: false, dateImages: [], fieldImages: [],
            dates: [], dateFields: [], loadingDates: true, mapboxError: false }
    }

    loadFieldImages(items) {
        let images = sortby(items, 'collectionDate').reverse()
        return images
    }

    loadDateImages(items) {
        let dates = sortby(pluck(uniqby(items, 'collectionDate'), 'collectionDate'),
                           (value) => {return new Date(value)}).reverse()
        return dates
    }

    onUpdateFieldImages(response) {
        let images = this.loadFieldImages(response.data)
        this.setState({ fieldImages: images, loading: false,
                      activeImage: null, activeProduct: null })
    }

    onUpdateDateImages(response) {
        let dates = this.loadDateImages(response.data)
        this.setState({ dateImages: response.data, loadingDates: false,
                      dates: dates, activeImage: null, activeDate: null,
                      dateFields: [], dateFieldIds: [] })
    }

    onSetActiveImage(id) {
        let activeImage = this.state.fieldImages.find((image) => {
            return image.id === id
        })
        if (activeImage) {
            let activeProduct
            let mapboxError = false
            if (activeImage.products && activeImage.products.length > 0) {
                activeProduct = activeImage.products[0]
            }
            else {
                activeProduct = null
                mapboxError = true
            }
            this.setState({ activeImage: activeImage,
                          activeProduct: activeProduct,
                        mapboxError: mapboxError })
        }
        else
        {
            this.setState({ activeImage: null, activeProduct: null,
                            mapboxError: false })
        }
    }

    onSetActiveProduct(id) {
        let activeProduct = this.state.activeImage.products.filter(item => {
            return id === item.id
        })[0]
        this.setState({ activeProduct: activeProduct, mapboxError: false })
    }

    onSetActiveField(id) {
    //Don't hit API when user clicks an unauthorized Field.
        this.waitFor(FieldStore)
        if (FieldStore.getState().unauthorizedField) {
            this.setState({ fieldId: id, fieldImages: [], activeImage: null,
                      activeProduct: null, loading: false, mapboxError: null })
        } else {
            if (this.state.activeDate) {
                let activeImage = this.selectDateFieldImage(id)
                if (activeImage) {
                    this.setState({ activeImage: activeImage,
                        activeProduct: activeImage.products[0],
                        unavailableImage: false, mapboxError: null
                    })
                } else {
                    this.setState({ unavailableImage: true, activeImage: null,
                        activeProduct: null, mapboxError: null })
                }
            }
            else {
                this.setState({ fieldId: id, fieldImages: [], activeImage: null,
                              activeProduct: null, loading: true,
                              mapboxError: null })
                this.getInstance().fetchFieldImages()
            }
        }
    }

    onSetActiveFarm() {
        this.setState({ fieldImages: [], activeImage: null,
                      activeProduct: null, loading: false, mapboxError: false })
    }

    selectDateFieldImage(fieldId) {
        let dateFieldImage = this.state.dateImages.find((image) => {
            let dateMatch = image.collectionDate === this.state.activeDate
            let fieldMatch = image.fieldId === fieldId
            let match = dateMatch && fieldMatch ? true : false
            return match
        })
        return dateFieldImage
    }

    getDateImages() {
        this.setState({ dateImages: [], activeImage: null,
                      activeProduct: null })
        this.getInstance().fetchDateImages()
    }

    onSetActiveDate(date) {
        let sameDates = this.state.dateImages.filter((image) => {
            return image.collectionDate === date
        })

        //let dateFields = _(sameDates).pluck('field').unique('id').value()
        let dateFields = sameDates.map((image) => {
            return image.field[0]
        })
        let dateFieldIds = dateFields.map((item) => {
            return item.id
        })
        this.setState({ dateFields: dateFields, dateFieldIds: dateFieldIds,
                      activeDate: date, activeImage: null, mapboxError: null })
    }

    onClearActiveDate() {
        this.setState({ dateFields: [], dateFieldIds: [], activeDate: null,
                      activeImage: null, activeProduct: null, mapboxError: null })
    }

    onClearFieldImages() {
        this.setState({ fieldImages: [], activeImage: null, activeProduct: null,
                        mapboxError: false })
    }

    onSendMapboxError() {
        this.setState({ mapboxError: true })
    }
}

const imageStore = alt.createStore(ImageStore, 'imageStore')

export default imageStore
