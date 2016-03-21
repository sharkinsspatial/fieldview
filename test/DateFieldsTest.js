import test from 'tape'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import sinon from 'sinon'
import DateFields from '../src/components/DateFields'

test('DateFields', (t) => {
    t.test('calls getFields', (t) => {
        let FieldStore = { fields: [] }
        let getFields = sinon.spy()
        let FieldActions = { getFields: getFields }
        let ImageStore = { dateFields: [{ id: 0, name: 0 }] }
        let component = TestUtils.renderIntoDocument(<DateFields
            FieldStore={FieldStore} FieldActions={FieldActions}
            ImageStore={ImageStore}/>)
        t.ok(getFields.called)

        getFields.reset()
        FieldStore = { fields: [{id: 0}] }
        component = TestUtils.renderIntoDocument(<DateFields
            FieldStore={FieldStore} FieldActions={FieldActions}
            ImageStore={ImageStore}/>)
        t.notOk(getFields.called)
        t.end()
    })

    t.test('setActiveField', (t) => {
        let FieldStore = { fields: [] }
        let getFields = sinon.spy()
        let setActiveField = sinon.spy()
        let FieldActions = { getFields: getFields, setActiveField: setActiveField }
        let ImageStore = { dateFields: [{ id: 0, name: 0 }] }
        let component = TestUtils.renderIntoDocument(<DateFields
            FieldStore={FieldStore} FieldActions={FieldActions}
            ImageStore={ImageStore}/>)

        let renderedButtons = TestUtils
            .scryRenderedDOMComponentsWithTag(component, 'button')
        TestUtils.Simulate.click(renderedButtons[0])
        t.ok(setActiveField.called)
        t.equal(setActiveField.firstCall.args[0], 0,
                'Clicking a date field calls setActiveField with correct id')
        t.end()

    })
})

