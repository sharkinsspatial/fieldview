import test from 'tape'
import FarmTests from './FarmTests'
import FieldStoreTest from './FieldStoreTest'

test('Shutdown', function(t) {
    t.pass('Shutting down')
    t.end()
    setTimeout(function() {
        window.close();
    });
})


