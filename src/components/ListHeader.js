import React from 'react'
import classNames from 'classnames'

var ListHeader = React.createClass({
    propTypes: {
        text: React.PropTypes.string,
        listItems: React.PropTypes.array
    },

    render() {
        let headerClass = classNames({
            'text-center': true,
            'hidden': this.props.listItems.length == 0
        })
        return (
            <h4 className={headerClass}>{this.props.text}</h4>
        )
    }
})

export default ListHeader
