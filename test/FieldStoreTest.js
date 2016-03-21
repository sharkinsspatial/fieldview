/*eslint-disable no-console */
import test from 'tape'
import alt from '../src/alt'
import FieldActions from '../src/actions/FieldActions'
import FieldStore from '../src/stores/FieldStore'

test('FieldStore', (t) => {
    let fieldData = {data: [
        { id: 0, name: 0, farm:{ id: 0, name: 0}},
        { id: 1, name: 1, farm:{ id: 1, name: 1}}
    ]}
    t.test('setActiveField', (t) => {
        let action = FieldActions.setActiveField.id
        let data = 1
        alt.dispatcher.dispatch({action, data})
        t.equal(FieldStore.getState().activeField, null,
            'Setting activeField before fields load yields null activeField')
        t.ok(FieldStore.getState().unauthorizedField,
            'Reports the field as unauthorized')

        action = FieldActions.updateFields.id
        data = fieldData
        alt.dispatcher.dispatch({action, data})
        t.equal(FieldStore.getState().fields.length, 2)
        t.equal(FieldStore.getState().farms.length, 2)

        action = FieldActions.setActiveField.id
        data = 0
        alt.dispatcher.dispatch({action, data})
        t.deepEqual(FieldStore.getState().activeField, fieldData.data[0])
        t.deepEqual(FieldStore.getState().activeFarm, fieldData.data[0].farm.id)
        t.end()
    })

    t.test('setActiveFarm', (t) => {
        let action = FieldActions.updateFields.id
        let data = fieldData
        alt.dispatcher.dispatch({action, data})
        t.equal(FieldStore.getState().fields.length, 2)
        t.equal(FieldStore.getState().farms.length, 2)

        action = FieldActions.setActiveFarm.id
        data = 1
        alt.dispatcher.dispatch({action, data})
        t.equal(FieldStore.getState().activeFarm, 1)
        t.deepEqual(FieldStore.getState().farmFields, [fieldData.data[1]])
        t.end()
    })
})
