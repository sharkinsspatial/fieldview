import alt from '../alt'
import ImageSource from '../sources/ImageSource'
import FieldActions from '../actions/FieldActions'
import ImageActions from '../actions/ImageActions'
import FieldStore from './FieldStore'
import sortby from 'lodash.sortby'
import pluck from 'lodash.pluck'
import uniqby from 'lodash.uniqby'
import reverse from 'lodash.reverse'
import intersection from 'lodash.intersection'
import AuthenticationStore from './AuthenticationStore'
import AuthenticationActions from '../actions/AuthenticationActions'

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
        this.bindAction(AuthenticationActions.setCurrentCustomer,
                        this.onSetCurrentCustomer)
        this.bindAction(ImageActions.updateMapboxJSON, this.onUpdateMapboxJSON)
        this.bindAction(ImageActions.setMapView, this.onSetMapView)
        this.bindAction(ImageActions.setMapCompareView, this.onSetMapCompareView)
        this.bindAction(ImageActions.addCompareImage, this.onAddCompareImage)
        this.bindAction(ImageActions.clearCompareImages, this.onClearCompareImages)
        this.bindAction(ImageActions.setActiveProductType, this.onSetActiveProductType)
        this.state = { loading: false, dateImages: [], fieldImages: [],
            dates: [], dateFields: [], loadingDates: true, mapboxError: false,
            slides: true, mapboxToken: 'mapboxKey', mapView: true,
            compareProductTypes: [] }
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
        this.setDefaultProduct(activeImage)
    }

    addCompareImageAfter(activeImage, compareProductTypes) {
        let compareImageAfter = activeImage.id
        let commonProductTypes = intersection(compareProductTypes,
                                              this.state.compareProductTypes)
        let activeProductType = commonProductTypes.includes(this.state
                .activeProductType) ? this.state.activeProductType : null
        let compareProductAfter = null
        let compareProductBefore = this.state.compareProductBefore
        if (activeProductType) {
            compareProductAfter = this.getProductByType(activeImage,
                                                        activeProductType)
        } else {
            compareProductAfter = null
            compareProductBefore = null
        }
        this.setState({ compareImageAfter: compareImageAfter,
                      compareProductTypes: commonProductTypes,
                      activeProductType: activeProductType,
                      compareProductBefore: compareProductBefore,
                      compareProductAfter: compareProductAfter })
    }

    addCompareImageBefore(activeImage, compareProductTypes) {
        let compareImageBefore = activeImage.id
        let activeProductType = null
        let compareProductBefore = null
        if (activeImage.products) {
            activeProductType = compareProductTypes[0]
            compareProductBefore = this.getProductByType(activeImage,
                                                         activeProductType)
        }
        this.setState({ compareImageBefore: compareImageBefore,
                      compareProductTypes: compareProductTypes,
                      activeProductType: activeProductType,
                      compareProductBefore: compareProductBefore })
    }

    onAddCompareImage(id) {
        let activeImage = this.state.fieldImages.find((image) => {
            return image.id === id
        })

        let compareProductTypes = []
        if (activeImage.products) {
            compareProductTypes = activeImage.products.map((product) => {
                return product.productType
            })
        }
        if (this.state.compareImageBefore) {
            this.addCompareImageAfter(activeImage, compareProductTypes)
        } else {
            this.addCompareImageBefore(activeImage, compareProductTypes)
        }
    }

    getProductByType(image, type) {
        let compareProduct = null
        if (image && image.products) {
            compareProduct = image.products.find((product) => {
                return product.productType === type
            })
        }
        return compareProduct
    }

    onSetActiveProductType(type) {
        let beforeImage = this.state.fieldImages.find((image) => {
            return image.id === this.state.compareImageBefore
        })
        let compareProductBefore = this.getProductByType(beforeImage, type)

        let afterImage = this.state.fieldImages.find((image) => {
            return image.id === this.state.compareImageAfter
        })
        let compareProductAfter = this.getProductByType(afterImage, type)

        this.setState({ compareProductBefore: compareProductBefore,
                      compareProductAfter: compareProductAfter,
                    activeProductType: type })
    }

    onSetActiveProduct(id) {
        let activeProduct = this.state.activeImage.products.filter(item => {
            return id === item.id
        })[0]
        this.setState({ activeProduct: activeProduct, mapboxError: false })
        if (this.state.slides && activeProduct) {
            this.getInstance().fetchMapboxJSON()
        }
    }

    setDefaultProduct(activeImage) {
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
                        mapboxError: mapboxError, mapboxJSON: null })
            if (this.state.slides && activeProduct) {
                this.getInstance().fetchMapboxJSON()
            }
        }
        else
        {
            this.setState({ activeImage: null, activeProduct: null,
                            mapboxError: false, mapboxJSON: null })
        }
    }

    onSetActiveField(id) {
    //Don't hit API when user clicks an unauthorized Field.
        this.waitFor(FieldStore)
        if (FieldStore.getState().unauthorizedField) {
            this.setState({ fieldId: id, fieldImages: [], activeImage: null,
                      activeProduct: null, loading: false, mapboxError: false })
        } else {
            if (this.state.activeDate) {
                let activeImage = this.selectDateFieldImage(id)
                this.setDefaultProduct(activeImage)
            }
            else {
                this.setState({ fieldId: id, fieldImages: [], activeImage: null,
                              activeProduct: null, loading: true,
                              mapboxError: false})
                this.onClearCompareImages()
                this.getInstance().fetchFieldImages()
            }
        }
    }

    onSetActiveFarm() {
        this.onClearCompareImages()
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
        let dateFields = this.state.dateImages.reduce((memo, image) => {
            if (image.field[0] && image.collectionDate === date) {
                memo.push(image.field[0])
            }
            return memo
        }, [])
        let sortedDateFields = sortby(sortby(dateFields, 'name'), (field) => {
            if (field.farm) {
                return field.farm.name
            }
        })
        let dateFieldIds = dateFields.map((item) => {
            return item.id
        })
        this.setState({ dateFields: sortedDateFields, dateFieldIds: dateFieldIds,
                      activeDate: date, activeImage: null, mapboxError: false,
                    mapboxJSON: null })
    }

    onClearActiveDate() {
        this.setState({ dateFields: [], dateFieldIds: [], activeDate: null,
                      activeImage: null, activeProduct: null, mapboxError: false })
    }

    onClearFieldImages() {
        this.setState({ fieldImages: [], activeImage: null, activeProduct: false,
                        mapboxError: false })
    }

    onClearCompareImages() {
        this.setState({ compareImageAfter: null, compareImageBefore: null,
                      compareProductTypes: [], activeProductType: null,
                      compareProductBefore: null, compareProductAfter: null })
    }

    onSendMapboxError() {
        this.setState({ mapboxError: true })
    }

    onSetCurrentCustomer() {
        this.waitFor(AuthenticationStore)
        this.setState({ loading: false, dateImages: [], fieldImages: [],
            dates: [], dateFields: [], loadingDates: true, mapboxError: false } )
    }

    onUpdateMapboxJSON(response) {
        this.setState({ mapboxJSON: response.data })
    }

    onSetMapView(bool) {
        this.setState({ mapView: bool })
    }

    onSetMapCompareView(bool) {
        this.setState({ mapCompareView: bool })
    }
}

const imageStore = alt.createStore(ImageStore, 'imageStore')

export default imageStore
