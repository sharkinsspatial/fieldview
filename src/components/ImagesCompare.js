import React from 'react'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import moment from 'moment'

var ImagesCompare = React.createClass({
    handleImageChange(item) {
        this.props.ImageActions.addCompareImage(item.id)
    },

    componentWillMount() {
        this.props.ImageActions.setMapCompareView(true)
    },

    componentWillUnmount() {
        this.props.ImageActions.clearCompareImages()
        this.props.ImageActions.setMapCompareView(false)
    },

    render() {
        let imageItems = this.props.ImageStore.fieldImages.map(item => {
            //Removes UTC Z time code from string.
            let dateNoTime = item.collectionDate.split('T')[0]
            let formatDate = moment(dateNoTime).format('MMM Do YYYY')
            let active = item.id === this.props.ImageStore.compareImageBefore ||
                item.id === this.props.ImageStore.compareImageAfter ? 'active' : ''
            return <ListGroupItem key={item.id}
                    className='btn-block'
                    onClick={this.handleImageChange.bind(this, item)}
                    active={active}>{formatDate}</ListGroupItem>
        })
        return (
            <ListGroup>
                {imageItems}
            </ListGroup>
        )
    }
})

export default ImagesCompare
