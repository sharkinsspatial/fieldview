import alt from '../alt'

class FieldActions {
    constructor() {
        this.generateActions('updateFields', 'fieldsFailed', 'getFields',
                             'setActiveField', 'setActiveFarm', 'clearActiveField')
    }
}

const fieldActions = alt.createActions(FieldActions)

export default fieldActions
