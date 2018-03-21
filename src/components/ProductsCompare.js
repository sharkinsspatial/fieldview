import React from 'react'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import ListHeader from './ListHeader'

var ProductsCompare = React.createClass({
    handleProductChange(item) {
        this.props.ImageActions.setActiveProductType(item)
    },

    render() {
        let productItems = this.props.ImageStore.compareProductTypes.map((item) => {
            let active = item === this.props.ImageStore.activeProductType
                ? 'active' : ''
            return <ListGroupItem key={item}
                    className='btn-block'
                    onClick={this.handleProductChange.bind(this, item)}
                    active={active}>{item}</ListGroupItem>
        })
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

export default ProductsCompare
