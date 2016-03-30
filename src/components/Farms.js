import React from 'react'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import ListHeader from './ListHeader'

var Farms = React.createClass({
    handleFarmChange(id) {
        this.props.setActiveFarm(id)
    },

    render() {
        let farmItems = this.props.farms.map(item => {
            let active = ''
            if (this.props.activeFarm) {
                active = item.id === this.props.activeFarm
                    ? 'active' : ''
            }
            return <ListGroupItem key={item.id}
                onClick={this.handleFarmChange.bind(this, item.id)}
                active={active}>{item.name}</ListGroupItem>
        })

        return (
            <div>
                <ListHeader text='Select A Farm'
                    listItems={this.props.farms}/>
                <ListGroup>
                    {farmItems}
                </ListGroup>
            </div>
        )
    }
})

export default Farms
