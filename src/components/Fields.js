import React from 'react'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import scrollTo from './ScrollTo'

var Fields = React.createClass({
    componentWillMount() {
        if (this.props.fields.length == 0) {
            this.props.getFields()
        }
        //This action will fetch fieldImages when the component mounts coming
        //from dates view.
        if (this.props.activeField) {
            this.props.setActiveField(this.props.activeField.id)
        }
    },

    handleFieldChange(id) {
        this.props.setActiveField(id)
    },

    render() {
        let farmFieldItems = this.props.farmFields.map(item => {
            let active = ''
            if (this.props.activeField) {
                active = item.id === this.props.activeField.id
                    ? 'active' : ''
            }
            return <ListGroupItem key={item.id}
                className='btn-block'
                onClick={this.handleFieldChange.bind(this, item.id)}
                active={active} ref={active}>{item.name}</ListGroupItem>
        })

        return (
            <ListGroup>
                {farmFieldItems}
            </ListGroup>
        )
    },

    componentDidMount() {
        scrollTo(this.refs.active)
    },

    componentDidUpdate() {
        scrollTo(this.refs.active)
    }
})

export default Fields
