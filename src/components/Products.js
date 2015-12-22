import React from 'react'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'

var Products = React.createClass({
    handleProductChange(item) {
        this.props.ImageActions.setActiveProduct(item.id)
    },

    render() {
        let productItems = []
        if (this.props.ImageStore.activeImage) {
            productItems = this.props.ImageStore.activeImage
                .products.map((item, index) => {
                    let active = item.id === this.props.ImageStore.activeProduct.id
                        ? 'active' : ''
                    return <ListGroupItem key={item.id}
                    onClick={this.handleProductChange.bind(this, item)}
                    active={active}>{item.productType}</ListGroupItem>
                })
        }
        return (
            <ListGroup>
                {productItems}
            </ListGroup>
        )
    }
})

export default Products
