import React from 'react'
import Button from 'react-bootstrap/lib/Button'
import classNames from 'classnames'

var ClearCompareImages = React.createClass({
    render() {
        let textClass = classNames({
            'text-center': true,
            'textPadding': true,
            'hidden': this.props.listItems.length == 0
        })
        return (
            <div className={textClass}>
                <Button bsStyle='primary' onClick={this.handleClick}>Clear Selected</Button>
            </div>
        )
    },

    handleClick() {
        this.props.clearCompareImages()
    }
})

export default ClearCompareImages
