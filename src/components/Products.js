import React from 'react'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import ListHeader from './ListHeader'

var Products = React.createClass({
    handleProductChange(item) {
        this.props.ImageActions.setActiveProduct(item.id)
    },

    render() {
        let productItems = []
        if (this.props.ImageStore.activeImage) {
            productItems = this.props.ImageStore.activeImage
                .products.map((item) => {
                    let active = item.id === this.props.ImageStore.activeProduct.id
                        ? 'active' : ''
                    return <ListGroupItem key={item.id} className='btn-block'
                    onClick={this.handleProductChange.bind(this, item)}
                    active={active}>{item.productType}</ListGroupItem>
                })
        }
        return (
            <div>
            <ListHeader text='Select A Product'
                listItems={productItems}/>
            <ListGroup>
                {productItems}
            </ListGroup>
            </div>
        )
    }
})

export default Products
