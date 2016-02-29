/*eslint-disable no-console */
import test from 'tape'
import alt from '../src/alt'
import AuthenticationActions from '../src/actions/AuthenticationActions'
import AuthenticationStore from '../src/stores/AuthenticationStore'

test('AuthenticationStore', (t) => {
    t.test('Sets customers when there are multiple customers', (t) => {
        let data = {data: {customers: [{ id: 0 }, { id: 1 }]}}
        let action = AuthenticationActions.updateToken.id
        alt.dispatcher.dispatch({action, data})
        t.equal(AuthenticationStore.getState().customers[0].id, 0)
        t.notOk(AuthenticationStore.getState().customerId)
        t.end()
    })
    t.test('Sets customerId when there is a single customer', (t) => {
        let data = {data: {customers: [{ id: 1 }]}}
        let action = AuthenticationActions.updateToken.id
        alt.dispatcher.dispatch({action, data})
        t.equal(AuthenticationStore.getState().customerId, 1)
        t.end()
    })
})
