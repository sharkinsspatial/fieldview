import React from 'react'
import Collapse from 'react-bootstrap/lib/Collapse'
import Well from 'react-bootstrap/lib/Well'
import classNames from 'classnames'

var Loading = React.createClass({
    render() {
        let loadingClass = classNames({
            'fa': true,
            'fa-refresh': this.props.loading,
            'fa-spin': this.props.loading
        })
        let textClass = classNames({
            'text-center': true,
            'textPadding': true
        })
        return (
            <Collapse in={this.props.loading}>
                <div className={'text-center'}>
                <Well>
                    <span><i className={loadingClass}></i>{' ' + this.props.message}</span>
                </Well>
                </div>
            </Collapse>
        )
    }
})

export default Loading
