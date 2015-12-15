import React from 'react'
import Input from 'react-bootstrap/lib/Input'
import moment from 'moment'

var Images = React.createClass({
    render() {
        let imageItems = this.props.images.map(item => {
            let formatDate = moment(item.collectionDate).format('MMMM Do YYYY')
            return <option key={item.id} value={item.id}>{formatDate}</option>
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
