import React from 'react'
import Button from 'react-bootstrap/lib/Button'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import Input from 'react-bootstrap/lib/Input'
import Loading from './Loading'
import Message from './Message'

var Fields = React.createClass({
    componentWillMount() {
        if (this.props.fields.length == 0) {
            this.props.getFields()
        }
    },

    componentWillUnmount() {
        this.props.clearActiveField()
    },

    handleSelectFarm(event, id) {
        this.props.setActiveFarm(id)
    },
    handleSelectField(event, id) {
        this.props.setActiveField(id)
    },
    render() {
        let farmItems = this.props.farms.map(item => {
            return <MenuItem key={item.id} eventKey={item.id}
                >{item.name}</MenuItem>
        })
        let farmFieldItems = this.props.farmFields.map(item => {
            return <MenuItem key={item.id} eventKey={item.id}
                >{item.name}</MenuItem>
        })
        return (
            <div>
            <Input>
                <div className={'text-center'}>
                <DropdownButton title={'Select Farm'}
                    onSelect={this.handleSelectFarm}
                    id={'farmSelect'}>
                    {farmItems}
                </DropdownButton>
                <DropdownButton title={'Select Field'}
                    onSelect={this.handleSelectField}
                    id={'fieldSelect'}>
                    {farmFieldItems}
                </DropdownButton>
                </div>
            </Input>
            <Loading loading={this.props.loading}
                message={'Loading your fields'}/>
            <Message show={this.props.unauthorizedField}
                message={'You do not have any images available for this field'}/>
            </div>
        )
    }
})

export default Fields
