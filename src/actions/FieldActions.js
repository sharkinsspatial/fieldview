import alt from '../alt'

class FieldActions {
    constructor() {
        this.generateActions('updateFields', 'fieldsFailed', 'getFields',
                             'setActiveField', 'setActiveFarm')
    }
}

const fieldActions = alt.createActions(FieldActions)

export default fieldActions
