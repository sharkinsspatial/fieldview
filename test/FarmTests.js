/*eslint-disable no-console */
import test from 'tape'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import ReactDOM from 'react-dom'
import sinon from 'sinon'
import Farms from '../src/components/Farms'

test('Farms', (t) => {
    let farms = [{ id: 1, name: '1' },{ id: 2, name: '2' }]
    let setActiveFarm = sinon.spy()
    let component = TestUtils.renderIntoDocument(<Farms farms={farms}
                                                 setActiveFarm={setActiveFarm}/>)
    let renderedButtons = TestUtils.scryRenderedDOMComponentsWithTag(component,
                                                                    'button')
    TestUtils.Simulate.click(renderedButtons[0])
    t.equal(renderedButtons.length, farms.length,
            'Farms will render a button for each item in the farms prop')
    t.equal(setActiveFarm.firstCall.args[0], farms[0].id,
            'Clicking a farm button will call setActiveFarm with the id value')
    component.componentWillUnmount()
    t.equal(setActiveFarm.secondCall.args[0], undefined,
            'setActiveFarm is called with an undefined value when unmounting')
    t.end()
})




