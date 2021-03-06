import alt from '../alt'
import FieldSource from '../sources/FieldSource'
import FieldActions from '../actions/FieldActions'
import sortby from 'lodash.sortby'
import pluck from 'lodash.pluck'
import uniqby from 'lodash.uniqby'
import AuthenticationStore from './AuthenticationStore'
import AuthenticationActions from '../actions/AuthenticationActions'

class FieldStore {
    constructor() {
        this.registerAsync(FieldSource)
        this.bindAction(FieldActions.updateFields, this.onUpdate)
        this.bindAction(FieldActions.setActiveField, this.onSetActiveField)
        this.bindAction(FieldActions.getFields, this.onGetFields)
        this.bindAction(FieldActions.setActiveFarm, this.onSetActiveFarm)
        this.bindAction(FieldActions.clearActiveField, this.onClearActiveField)
        this.bindAction(AuthenticationActions.setCurrentCustomer,
                        this.onSetCurrentCustomer)
        this.state = { fields: [], farms: [], farmFields: [], loading: true,
            activeField: null}
    }

    load(items) {
        let farms = uniqby(pluck(items, 'farm'), 'id')
        return farms
    }

    onUpdate(response) {
        let farms = this.load(response.data)
        let fields = sortby(response.data, 'name')
        this.setState({ fields, loading: false, farms, farmFields: [] })
    }

    onSetActiveField(id) {
        let activeField = this.state.fields.find((field) => {
            return field.id === id
        })
        if (activeField) {
            let farmFields = this.state.fields.filter((field) => {
                if (field.farm && activeField.farm) {
                    return field.farm.id === activeField.farm.id
                }
                else {
                    return false
                }
            })
            this.setState({ activeField, unauthorizedField: false,
                activeFarm: activeField.farm.id, farmFields })
        }
        else {
            this.setState({ activeField: null, unauthorizedField: true})
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
        this.setState({ farmFields, activeFarm: id,
                      activeField: null })
    }

    onSetCurrentCustomer() {
        this.waitFor(AuthenticationStore)
        this.setState({ fields: [], farms: [], farmFields: [], loading: true,
            activeField: null})
    }
}

const fieldStore = alt.createStore(FieldStore, 'fieldStore')

export default fieldStore
