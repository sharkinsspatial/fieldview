import React from 'react'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import Loading from './Loading'
import ListHeader from './ListHeader'

var Fields = React.createClass({
    componentWillMount() {
        if (this.props.fields.length == 0) {
            this.props.getFields()
        }
    },

    handleFieldChange(id) {
        this.props.setActiveField(id)
    },

    componentWillUnmount() {
        this.props.clearActiveField()
    },

    render() {
        let farmFieldItems = this.props.farmFields.map(item => {
            let active = ''
            if (this.props.activeField) {
                active = item.id === this.props.activeField.id
                    ? 'active' : ''
            }
            return <ListGroupItem key={item.id}
                onClick={this.handleFieldChange.bind(this, item.id)}
                active={active}>{item.name}</ListGroupItem>
        })

        return (
            <div>
                <ListHeader text='Select A Field'
                    listItems={this.props.farmFields}/>
                <ListGroup>
                    {farmFieldItems}
                </ListGroup>
                <Loading loading={this.props.loading}
                    message={'Loading your fields'}/>
            </div>
        )
    }
})

export default Fields
