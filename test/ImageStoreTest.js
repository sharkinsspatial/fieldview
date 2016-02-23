/*eslint-disable no-console */
import test from 'tape'
import React from 'react'
import alt from '../src/alt'
import ImageActions from '../src/actions/ImageActions'
import ImageStore from '../src/stores/ImageStore'

test('ImageStore', (t) => {
    let action = ImageActions.updateFieldImages.id
    let data = {data : [{ id: 0, collectionDate: "2015-05-24T00:00:00.000Z" },
        { id: 1, collectionDate: "2015-06-24T00:00:00.000Z" },
        { id: 2, collectionDate: "2015-05-25T00:00:00.000Z" }]}
    alt.dispatcher.dispatch({action, data })
    t.equal(ImageStore.getState().fieldImages[0].id, 1, 'Should sort by date')
    t.equal(ImageStore.getState().fieldImages[2].id, 0, 'Should sort by date')
    t.end()
})
