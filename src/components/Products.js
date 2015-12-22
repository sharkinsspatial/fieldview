import React from 'react'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'

var Products = React.createClass({
    handleProductChange(item) {
        this.props.setActiveProduct(item.id)
    },

    render() {
        let productItems = []
        if (this.props.activeImage) {
            productItems = this.props.activeImage.products.map((item, index) => {
                let active = item.id === this.props.activeProduct.id ? 'active' : ''
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
