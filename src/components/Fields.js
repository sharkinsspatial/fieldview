import React from 'react'

var Fields = React.createClass({
    componentDidMount() {
        this.props.getFields()
    },
    render() {
        return (
            <div>This is the fields</div>
        )
    }
})

export default Fields
