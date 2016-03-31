import test from 'tape'
import FarmTests from './FarmTests'
import FieldStoreTest from './FieldStoreTest'
import ImageStoreTest from './ImageStoreTest'
import AuthenticationStoreTest from './AuthenticationStoreTest'
import DateFieldsTest from './DateFieldsTest'
import ImagesCompareTest from './ImagesCompareTest'

test('Shutdown', function(t) {
    t.pass('Shutting down')
    t.end()
    setTimeout(function() {
        window.close();
    });
})


