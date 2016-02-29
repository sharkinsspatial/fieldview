/*eslint-disable no-console */
import test from 'tape'
import alt from '../src/alt'
import FieldActions from '../src/actions/FieldActions'
import FieldStore from '../src/stores/FieldStore'

test('FieldStore', (t) => {
    let action = FieldActions.setActiveField.id
    let data = {id: 1}
    alt.dispatcher.dispatch({action, data})
    t.equal(FieldStore.getState().activeField, null,
            'Setting an activeField before fields are loaded results in a null value')
    t.end()
})
