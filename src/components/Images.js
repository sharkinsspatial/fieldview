import React from 'react'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import moment from 'moment'
import Loading from './Loading'

var Images = React.createClass({
    handleImageChange(item) {
        this.props.ImageActions.setActiveImage(item.id)
    },

    componentWillUnmount() {
        this.props.ImageActions.clearFieldImages()
    },

    render() {
        let imageItems = this.props.ImageStore.fieldImages.map(item => {
            //Removes UTC Z time code from string.
            let dateNoTime = item.collectionDate.split('T')[0]
            let formatDate = moment(dateNoTime).format('MMMM Do YYYY')
            let active = ''
            if (this.props.ImageStore.activeImage) {
                active = item.id === this.props.ImageStore.activeImage.id ? 'active' : ''
            }
            return <ListGroupItem key={item.id}
                    onClick={this.handleImageChange.bind(this, item)}
                    active={active}>{formatDate}</ListGroupItem>
        })
        return (
            <div>
            <ListGroup>
                {imageItems}
            </ListGroup>
            <Loading loading={this.props.ImageStore.loading}
                message={'Loading your images'}/>
            </div>
        )
    }
})

export default Images
