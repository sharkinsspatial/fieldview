/*eslint-disable no-console */
import test from 'tape'
import alt from '../src/alt'
import ImageActions from '../src/actions/ImageActions'
import FieldActions from '../src/actions/FieldActions'
import ImageStore from '../src/stores/ImageStore'

test('ImageStore', (t) => {
    let dateData = {data :
        [{id: 0,
            collectionDate: "2015-05-24T00:00:00.000Z",
            fieldId: 0,
            field: [{id: 0,
                        name: 0,
                        farm:{name: 0, id: 0}}]},
        { id: 1,
            collectionDate: "2015-06-24T00:00:00.000Z",
            fieldId: 1,
            products: [{id: 0,
                        productType: 'CIR'},
                       {id: 1,
                        productType: 'NDVI'}],
            field: [{id: 1,
                        name: 1,
                        farm:{name: 1, id: 1}}]},
        { id: 2,
            collectionDate: "2015-05-25T00:00:00.000Z",
            fieldId: 1,
            products: [{id: 0,
                        productType: 'CIR'},
                       {id: 1,
                        productType: 'NDVI'}],
            field: [{id: 1,
                        name: 1,
                        farm:{name: 1, id: 1}}]}
        ]}

    t.test('updateFieldImages', (t) => {
        let data = dateData
        let action = ImageActions.updateFieldImages.id
        alt.dispatcher.dispatch({action, data})

        t.equal(ImageStore.getState().fieldImages[0].id, 1,
                'Sorts field images by date')
        t.equal(ImageStore.getState().fieldImages[2].id, 0,
                'Sorts field images by date')
        t.end()
    })

    t.test('setActiveImage', (t) => {
        let action = ImageActions.setActiveImage.id
        let data = 0
        alt.dispatcher.dispatch({action, data})

        t.deepEqual(ImageStore.getState().activeImage, dateData.data[0])
        t.notOk(ImageStore.getState().activeProduct,
                'Active product is null with no prodcuts')
        t.ok(ImageStore.getState().mapboxError,
             'Sends error message with no products')

        data = 1
        alt.dispatcher.dispatch({action, data })

        t.deepEqual(ImageStore.getState().activeImage, dateData.data[1])
        t.deepEqual(ImageStore.getState().activeProduct,
                    dateData.data[1].products[0],
                    'Sets activeProduct to first product by default')
        t.notOk(ImageStore.getState().mapboxError,
               'No error message with products')
        t.end()
    })

    t.test('setActiveDate', (t) => {
        let noFieldImage = { id: 3,
            collectionDate: "2015-05-25T00:00:00.000Z",
            fieldId: 80,
            products: [{id: 0,
                        productType: 'CIR'},
                       {id: 1,
                        productType: 'NDVI'}],
            field: []
        }
        let data = {data: dateData.data.concat(noFieldImage)}
        let action = ImageActions.updateDateImages.id
        alt.dispatcher.dispatch({action, data})

        action = ImageActions.setActiveDate.id
        data = '2015-05-24T00:00:00.000Z'
        alt.dispatcher.dispatch({action, data})

        t.equal(ImageStore.getState().dateFields.length, 1)
        t.deepEqual(ImageStore.getState().dateFields[0],
                    dateData.data[0].field[0])
        t.equal(ImageStore.getState().dateFieldIds.length, 1)
        t.equal(ImageStore.getState().dateFieldIds[0], 0)

        data = '2014-05-24T00:00:00.000Z'
        alt.dispatcher.dispatch({action, data})
        t.equal(ImageStore.getState().dateFields.length, 0,
                'Non-existent does not find any fields')
        t.equal(ImageStore.getState().dateFieldIds.length, 0,
                'Non-existent does not find any fields')

        //Reload images data to test sorting.
        data = {data : [{ id: 2, collectionDate: "2015-05-24T00:00:00.000Z",
            fieldId: 2, field: [{id: 2, name: 'a', farm: {name: 'bfarm', id: 2}}]},
            { id: 0, collectionDate: "2015-05-24T00:00:00.000Z",
            fieldId: 0, field: [{id: 0, name: 'a', farm: {name: 'afarm', id: 1}}]},
            { id: 1, collectionDate: "2015-05-24T00:00:00.000Z",
            fieldId: 1, field: [{id: 1, name: 'b', farm: {name: 'afarm', id: 1}}]},
            { id: 4, collectionDate: "2015-05-24T00:00:00.000Z",
            fieldId: 4, field: [{id: 4, name: 'b', farm: null}]}
        ]}

        action = ImageActions.updateDateImages.id
        alt.dispatcher.dispatch({action, data})

        action = ImageActions.setActiveDate.id
        data = '2015-05-24T00:00:00.000Z'
        alt.dispatcher.dispatch({action, data})
        console.log(ImageStore.getState().dateFields)
        t.equal(ImageStore.getState().dateFields[0].id, 0,
               'Sorts dateFields by name and nested farm name')
        t.equal(ImageStore.getState().dateFields[1].id, 1,
               'Sorts dateFields by name and nested farm name')
        t.equal(ImageStore.getState().dateFields[2].id, 2,
               'Sorts dateFields by name and nested farm name')
        t.end()
    })

    t.test('setActiveField', (t) => {
        //Need to upload data first
        let data = dateData
        let action = ImageActions.updateDateImages.id
        alt.dispatcher.dispatch({action, data})

        data = '2015-05-24T00:00:00.000Z'
        action = ImageActions.setActiveDate.id
        alt.dispatcher.dispatch({action, data})

        //Field needs to be in FieldStore fields or it will be unauthorized
        data = {data: [{id: 0, name: 'Field 0', farm: {id: 1}}]}
        action = FieldActions.updateFields.id
        alt.dispatcher.dispatch({action, data})

        data = 0
        action = FieldActions.setActiveField.id
        alt.dispatcher.dispatch({action, data})

        t.deepEqual(ImageStore.getState().activeImage,
                    dateData.data[0],
                    'Selects image with current date and field id')
        t.notOk(ImageStore.getState().activeProduct, 'This image has no products')

        data = 1
        alt.dispatcher.dispatch({action, data})

        t.notOk(ImageStore.getState().activeImage,
               'Active image is null for unauthorized field')
        t.end()
    })

    t.test('updateDateImages', (t) => {
        let data = dateData
        let action = ImageActions.updateDateImages.id
        alt.dispatcher.dispatch({action, data})

        t.deepEqual(ImageStore.getState().dateImages, dateData.data)
        t.equal(ImageStore.getState().dates[0], dateData.data[1].collectionDate,
                'Sorts date images by date')
        t.equal(ImageStore.getState().dates[2], dateData.data[0].collectionDate,
                'Sorts date images by date')
        t.end()
    })

    t.test('addCompareImage', (t) => {
        let data = dateData
        let action = ImageActions.updateFieldImages.id
        alt.dispatcher.dispatch({action, data})

        data = 1
        action = ImageActions.addCompareImage.id
        alt.dispatcher.dispatch({action, data})

        t.equal(ImageStore.getState().compareImageBefore, 1)
        t.deepEqual(ImageStore.getState().compareProductTypes, ['CIR', 'NDVI'])
        t.equal(ImageStore.getState().activeProductType, 'CIR')
        t.deepEqual(ImageStore.getState().compareProductBefore,
                    dateData.data[1].products[0])

        data = 2
        alt.dispatcher.dispatch({action, data})
        t.equal(ImageStore.getState().compareImageAfter, 2)
        t.deepEqual(ImageStore.getState().compareProductTypes, ['CIR', 'NDVI'])
        t.equal(ImageStore.getState().activeProductType, 'CIR')
        t.deepEqual(ImageStore.getState().compareProductAfter,
                    dateData.data[2].products[0])

        data = 0
        alt.dispatcher.dispatch({action, data})
        t.equal(ImageStore.getState().compareImageAfter, 0)
        t.deepEqual(ImageStore.getState().compareProductTypes.length, 0)
        t.notOk(ImageStore.getState().activeProductType)
        t.notOk(ImageStore.getState().compareProductBefore)
        t.notOk(ImageStore.getState().compareProductAfter)
        t.end()
    })

    t.test('setActiveProductType', (t) => {
        let data = dateData
        let action = ImageActions.updateFieldImages.id
        alt.dispatcher.dispatch({action, data})

        data = 1
        action = ImageActions.addCompareImage.id
        alt.dispatcher.dispatch({action, data})

        data = 'NDVI'
        action = ImageActions.setActiveProductType.id
        alt.dispatcher.dispatch({action, data})

        t.deepEqual(ImageStore.getState().compareProductBefore,
                    dateData.data[1].products[1])

        data = 2
        action = ImageActions.addCompareImage.id
        alt.dispatcher.dispatch({action, data})

        t.deepEqual(ImageStore.getState().compareProductAfter,
                    dateData.data[2].products[1])
        t.end()
    })
})


