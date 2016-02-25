import React from 'react'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'

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
                active={active}>{item.name + ' - ' + item.farm.name}
                </ListGroupItem>
        })

        return (
            <ListGroup>
                {fieldItems}
            </ListGroup>
        )
    }
})

export default DateFields
