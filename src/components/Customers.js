import React from 'react'
import classNames from 'classnames'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'

var Customers = React.createClass({
    onSelect(object, key) {
        this.props.setCurrentCustomer(key);
        setTimeout(() => {
            this.props.history.pushState(null, '/', null)
        }, 0)
    },

    render() {
        let textClass = classNames({
            'text-center': true,
            'textPadding': true
        })
        let customerItems = this.props.customers.map(item => {
            return <MenuItem eventKey={item.id}
                key={item.id}>{item.name}</MenuItem>
        })
        return (
            <div>
                <div className={textClass}>
                    <DropdownButton id='customers' title={'Select a Customer'}
                        onSelect={this.onSelect}>{customerItems}</DropdownButton>
                </div>
            </div>
        )
    }
});

export default Customers
