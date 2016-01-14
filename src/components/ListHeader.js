import React from 'react'
import classNames from 'classnames'

var ListHeader = React.createClass({
    propTypes: {
        text: React.PropTypes.string.isRequired,
        listItems: React.PropTypes.array.isRequired
    },

    render() {
        let headerClass = classNames({
            'text-center': true,
            'hidden': this.props.listItems.length == 0 ? true : false
        })
        return (
            <h4 className={headerClass}>{this.props.text}</h4>
        )
    }
})

export default ListHeader
