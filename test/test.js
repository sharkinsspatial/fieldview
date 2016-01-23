/*eslint-disable no-console */
import test from 'tape'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import ReactDOM from 'react-dom'
import Farms from '../src/components/Farms'

test('Farms', (t) => {
    let farms = [{ id: 1, name: '1' },{ id: 2, name: '2' }]
    let component = TestUtils.renderIntoDocument(<Farms farms={farms}/>)
    let renderedButtons = TestUtils.scryRenderedDOMComponentsWithTag(component,
                                                                    'button')
    t.equal(renderedButtons.length, 1,
            'Farms will render a button for each item in the farms prop')
    t.end()
})

test('Shutdown', function(t) {
    t.pass('Shutting down')
    t.end()
    setTimeout(function() {
        window.close();
    });
})



