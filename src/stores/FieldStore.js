import alt from '../alt'
import FieldSource from '../sources/FieldSource'
import FieldActions from '../actions/FieldActions'
import moment from 'moment'
import sortby from 'lodash.sortby'
import pluck from 'lodash.pluck'
import uniqby from 'lodash.uniqby'

export class FieldStore {
    constructor() {
        this.fieldMap = new Map()
        this.registerAsync(FieldSource)
        this.bindAction(FieldActions.updateFields, this.onUpdate)
        this.bindAction(FieldActions.setActiveField, this.onSetActiveField)
        this.bindAction(FieldActions.getFields, this.onGetFields)
        this.bindAction(FieldActions.setActiveFarm, this.onSetActiveFarm)
        this.bindAction(FieldActions.clearActiveField, this.onClearActiveField)
        this.state = { fields: [], farms: [], farmFields: [], loading: true,
            activeField: null}
    }

    load(items) {
        items.forEach((item) => {
            this.fieldMap.set(item.id, item)
        })
        let farms = uniqby(pluck(items, 'farm'), 'id')
        return farms
    }

    onUpdate(response) {
        let farms = this.load(response.data)
        let fields = sortby(response.data, 'name')
        this.setState({ fields: fields, loading: false, farms: farms, farmFields: [] })
    }

    onSetActiveField(id) {
        let activeField = this.fieldMap.get(id)
        if (activeField) {
            this.setState({ activeField: activeField, unauthorizedField: false })
        }
        else {
            this.setState({ activeField: null, unauthorizedField: true })
        }
    }

    onClearActiveField() {
        this.setState({ activeField: null })
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
        this.setState({ farmFields: farmFields, activeFarm: id })
    }
}

const fieldStore = alt.createStore(FieldStore, 'fieldStore')

export default fieldStore
