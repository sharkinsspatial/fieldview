/*eslint-disable no-console */
import test from 'tape'
import React from 'react'
import alt from '../src/alt'
import ImageActions from '../src/actions/ImageActions'
import ImageStore from '../src/stores/ImageStore'

test('ImageStore', (t) => {
    let dateData = {data : [{ id: 0, collectionDate: "2015-05-24T00:00:00.000Z" },
            { id: 1, collectionDate: "2015-06-24T00:00:00.000Z", products: [{id: 0}] },
            { id: 2, collectionDate: "2015-05-25T00:00:00.000Z" }]}

    t.test('Sorts fieldImages by date', (t) => {
        let data = dateData
        let action = ImageActions.updateFieldImages.id
            alt.dispatcher.dispatch({action, data})
            t.equal(ImageStore.getState().fieldImages[0].id, 1)
            t.equal(ImageStore.getState().fieldImages[2].id, 0)
            t.end()
    })

    t.test('activeImage is set correctly', (t) => {
        let action = ImageActions.setActiveImage.id
        let data = 0
        alt.dispatcher.dispatch({action, data})
        t.deepEqual(ImageStore.getState().activeImage, dateData.data[0])
        t.notOk(ImageStore.getState().activeProduct, 'Active product is null with no prodcuts')
        t.end()
    })

    t.test('activeImage and default activeProduct are set correctly', (t) => {
        let action = ImageActions.setActiveImage.id
        let data = 1
        alt.dispatcher.dispatch({action, data})
        t.equal(ImageStore.getState().activeProduct.id, 0, 'Active product id is correct')
        t.end()
    })

    t.test('Creates sorted list of dates from dateImages', (t) => {
        let data = dateData
        let action = ImageActions.updateDateImages.id
            alt.dispatcher.dispatch({action, data})
            t.equal(ImageStore.getState().dates[0], dateData.data[1].collectionDate)
            t.equal(ImageStore.getState().dates[2], dateData.data[0].collectionDate)
            t.end()
    })
})


