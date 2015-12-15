import alt from '../alt'
import FieldSource from '../sources/FieldSource'
import FieldActions from '../actions/FieldActions'
import moment from 'moment'

class FieldStore {
    constructor() {
        this.fields = new Map()
        this.registerAsync(FieldSource)
        this.bindAction(FieldActions.updateFields, this.onUpdate)
        this.bindAction(FieldActions.fetchingFields, this.onFetchingFields)
        this.bindAction(FieldActions.setActiveField, this.onSetActiveField)
        this.bindAction(FieldActions.getFields, this.onGetFields)
    }

    onFetchingFields() {
        this.setState({loading: true})
    }

    load(items) {
        items.forEach((item) => {
            this.fields.set(item.id, item)
        })
    }

    onUpdate(response) {
        this.load(response.data)
        this.setState({ fields: response.data, loading: false })
    }

    onSetActiveField(id) {
        let activeField = this.fields.get(id)
        if (activeField) {
            this.setState({ activeField: id })
        }
        else {
            this.setState({ activeField: null })
        }
    }

    onGetFields() {
        if (!this.getInstance().isLoading()) {
            this.getInstance().fetchFields()
        }
    }
}

const fieldStore = alt.createStore(FieldStore, 'fieldStore')

export default fieldStore
