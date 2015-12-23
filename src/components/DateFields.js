import React from 'react'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import Message from './Message'

var DateFields = React.createClass({
    componentWillMount() {
        if (this.props.FieldStore.fields.length == 0) {
            this.props.FieldActions.getFields()
        }
    },

    handleFieldChange(item) {
        this.props.FieldActions.setActiveField(item.id)
    },

    render() {
        let fieldItems = this.props.ImageStore.dateFields.map(item => {
            let active = ''
            if (this.props.FieldStore.activeField) {
                active = item.id === this.props.FieldStore.activeField.id ?
                    'active' : ''
            }
            return <ListGroupItem key={item.id}
                onClick={this.handleFieldChange.bind(this, item)}
                active={active}>{item.name}</ListGroupItem>
        })

        return (
            <div>
                <ListGroup>
                    {fieldItems}
                </ListGroup>
                <Message show={this.props.ImageStore.unavailableImage}
                    message={'There is no image available for this field on the selected date'}/>
            </div>
        )
    }
})

export default DateFields
