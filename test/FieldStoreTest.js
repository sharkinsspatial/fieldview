/*eslint-disable no-console */
import test from 'tape'
import React from 'react'
import alt from '../src/alt'
import FieldActions from '../src/actions/FieldActions'
import {FieldStore} from '../src/stores/FieldStore'

test('FieldStore', (t) => {
    let store = alt.createStore(FieldStore)
    let action = FieldActions.setActiveField
    let data = {id: 1}
    alt.dispatcher.dispatch({action, data})
    t.equal(store.getState().activeField, null,
            'Setting an activeField before fields are loaded results in a null value')
    t.end()


})
