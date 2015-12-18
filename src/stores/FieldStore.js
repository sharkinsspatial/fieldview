import alt from '../alt'
import FieldSource from '../sources/FieldSource'
import FieldActions from '../actions/FieldActions'
import moment from 'moment'
import _ from 'lodash'

class FieldStore {
    constructor() {
        this.fieldMap = new Map()
        this.registerAsync(FieldSource)
        this.bindAction(FieldActions.updateFields, this.onUpdate)
        this.bindAction(FieldActions.setActiveField, this.onSetActiveField)
        this.bindAction(FieldActions.getFields, this.onGetFields)
        this.bindAction(FieldActions.setActiveFarm, this.onSetActiveFarm)
        this.state = { fields: [], farms: [], farmFields: [], loading: false,
            activeField: null}
    }

    load(items) {
        items.forEach((item) => {
            this.fieldMap.set(item.id, item)
        })
        let farms = _(items).pluck('farm').unique('id').value()
        return farms
    }

    onUpdate(response) {
        let farms = this.load(response.data)
        this.setState({ fields: response.data, loading: false, farms: farms, farmFields: [] })
    }

    onSetActiveField(id) {
        let activeField = this.fieldMap.get(id)
        if (activeField) {
            this.setState({ activeField: activeField })
        }
        else {
            this.setState({ activeField: null })
        }
    }

    onGetFields() {
        this.setState({ loading: true })
        if (!this.getInstance().isLoading()) {
            this.getInstance().fetchFields()
        }
    }

    onSetActiveFarm(id) {
        let farmFields = this.state.fields.filter((field) => {
            return field.farm.id === id
        })
        this.setState({ farmFields: farmFields})
    }
}

const fieldStore = alt.createStore(FieldStore, 'fieldStore')

export default fieldStore