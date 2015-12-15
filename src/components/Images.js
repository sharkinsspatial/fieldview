import React from 'react'
import Input from 'react-bootstrap/lib/Input'
import moment from 'moment'

var Images = React.createClass({
    render() {
        let imageItems = this.props.images.map(item => {
            //Removes UTC Z time code from string.
            let dateNoTime = item.collectionDate.split('T')[0]
            let formatDate = moment(dateNoTime).format('MMMM Do YYYY')
            return <option key={item.id} value={item}>{formatDate}</option>
        })
        return (
            <div>
                <Input type='select' multiple>
                    {imageItems}
                </Input>
            </div>
        )
    }
})

export default Images
