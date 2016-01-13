import alt from '../alt'
import ImageSource from '../sources/ImageSource'
import FieldActions from '../actions/FieldActions'
import ImageActions from '../actions/ImageActions'
import FieldStore from './FieldStore'
import _ from 'lodash'

class ImageStore {
    constructor() {
        this.dateImages = new Map()
        this.fieldImages = new Map()
        this.registerAsync(ImageSource)
        this.bindAction(ImageActions.setActiveImage, this.onSetActiveImage)
        this.bindAction(ImageActions.setActiveProduct, this.onSetActiveProduct)
        this.bindAction(FieldActions.setActiveField, this.onSetActiveField)
        this.bindAction(ImageActions.setActiveDate, this.onSetActiveDate)
        this.bindAction(ImageActions.getDateImages, this.getDateImages)
        this.bindAction(ImageActions.updateFieldImages, this.onUpdateFieldImages)
        this.bindAction(ImageActions.updateDateImages, this.onUpdateDateImages)
        this.bindAction(ImageActions.clearActiveDate, this.onClearActiveDate)
        this.bindAction(ImageActions.clearFieldImages, this.onClearFieldImages)
        this.state = { loading: false, dateImages: [], fieldImages: [],
            dates: [], dateFields: [], loadingDates: true}
    }

    loadFieldImages(items) {
        items.forEach((item) => {
            this.fieldImages.set(item.id, item)
        })
    }

    loadDateImages(items) {
        items.forEach((item) => {
            this.dateImages
            this.dateImages.set(item.id, item)
        })
        let dates =  _.sortBy(_.pluck(_.unique(items, 'collectionDate'),'collectionDate'), (value) =>
                              {return new Date(value)}).reverse()
        return dates
    }

    onUpdateFieldImages(response) {
        this.loadFieldImages(response.data)
        this.setState({ fieldImages: response.data, loading: false,
                      activeImage: null, activeProduct: null })
    }

    onUpdateDateImages(response) {
        let dates = this.loadDateImages(response.data)
        this.setState({ dateImages: response.data, loadingDates: false,
                      dates: dates, activeImage: null, activeDate: null,
                      dateFields: [], dateFieldIds: [] })
    }

    onSetActiveImage(id) {
        let activeImage = this.fieldImages.get(id)
        if (activeImage) {
            this.setState({ activeImage: activeImage,
                          activeProduct: activeImage.products[0] })
        }
        else
        {
            this.setState({ activeImage: null, activeProduct: null })
        }
    }

    onSetActiveProduct(id) {
        let activeProduct = this.state.activeImage.products.filter(item => {
            return id === item.id
        })[0]
        this.setState({ activeProduct: activeProduct })
    }

    onSetActiveField(id) {
    //Don't hit API when user clicks an unauthorized Field.
        this.waitFor(FieldStore)
        if (FieldStore.getState().unauthorizedField) {
            this.setState({ fieldId: id, fieldImages: [], activeImage: null,
                      activeProduct: null, loading: false})
        } else {
            if (this.state.activeDate) {
                let activeImage = this.selectDateFieldImage(id)
                if (activeImage) {
                    this.setState({ activeImage: activeImage,
                        activeProduct: activeImage.products[0],
                        unavailableImage: false
                    })
                } else {
                    this.setState({ unavailableImage: true, activeImage: null,
                        activeProduct: null})
                }
            }
            else {
                this.setState({ fieldId: id, fieldImages: [], activeImage: null,
                              activeProduct: null, loading: true})
                this.getInstance().fetchFieldImages()
            }
        }
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
                      activeDate: date, activeImage: null})
    }

    onClearActiveDate() {
        this.setState({ dateFields: [], dateFieldIds: [], activeDate: null,
                      activeImage: null, activeProduct: null})
    }

    onClearFieldImages() {
        this.setState({ fieldImages: [], activeImage: null, activeProduct: null })
    }
}

const imageStore = alt.createStore(ImageStore, 'imageStore')

export default imageStore
