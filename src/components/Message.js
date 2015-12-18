import React from 'react'
import Collapse from 'react-bootstrap/lib/Collapse'
import Well from 'react-bootstrap/lib/Well'
import classNames from 'classnames'

var Message = React.createClass({
    render() {
        let textClass = classNames({
            'text-center': true,
            'textPadding': true
        })
        return (
            <Collapse in={this.props.show}>
                <div className={'text-center'}>
                <Well>
                    <span>{this.props.message}</span>
                </Well>
                </div>
            </Collapse>
        )
    }
})

export default Message
