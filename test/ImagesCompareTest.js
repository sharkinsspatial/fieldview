/*eslint-disable no-console */
import test from 'tape'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import ReactDOM from 'react-dom'
import sinon from 'sinon'
import ImagesCompare from '../src/components/ImagesCompare'

test('ImagesCompare', (t) => {
    let setMapCompareView = sinon.spy()
    let clearCompareImages = sinon.spy()
    let addCompareImage = sinon.spy()
    let props = {
        ImageStore: {
            fieldImages: [{id: 0, collectionDate: ''}, {id: 1, collectionDate: ''}],
            compareImageBefore: 0,
            compareImageAfter: 1
        },
        ImageActions: {
            setMapCompareView: setMapCompareView,
            clearCompareImages: clearCompareImages,
            addCompareImage: addCompareImage
        }
    }

    t.test('componentWillMount', (t) => {
        let component = TestUtils.renderIntoDocument(<ImagesCompare
            ImageStore={props.ImageStore} ImageActions={props.ImageActions}/>)
        t.ok(setMapCompareView.firstCall.args[0])
        resetSpys()
        t.end()
    })

    t.test('componentWillUnmount', (t) => {
        let component = TestUtils.renderIntoDocument(<ImagesCompare
            ImageStore={props.ImageStore} ImageActions={props.ImageActions}/>)
        component.componentWillUnmount()
        t.notOk(setMapCompareView.secondCall.args[0],
                'setMapCompareView is called with false when unmounting')
        t.ok(clearCompareImages.called)
        resetSpys()
        t.end()
    })

    t.test('active', (t) => {
        let component = TestUtils.renderIntoDocument(<ImagesCompare
            ImageStore={props.ImageStore} ImageActions={props.ImageActions}/>)

        let activeButtons = TestUtils
            .scryRenderedDOMComponentsWithClass(component, 'active')
        t.equal(activeButtons.length, 2)
        resetSpys()
        t.end()
    })

    t.test('onChange', (t) => {
        let component = TestUtils.renderIntoDocument(<ImagesCompare
            ImageStore={props.ImageStore} ImageActions={props.ImageActions}/>)
        let renderedButtons = TestUtils
            .scryRenderedDOMComponentsWithTag(component, 'button')
        TestUtils.Simulate.click(renderedButtons[0])
        t.ok(addCompareImage.called)
        resetSpys()
        t.end()
    })

    function resetSpys() {
        setMapCompareView.reset()
        clearCompareImages.reset()
    }
})

