import React from 'react'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import moment from 'moment'
import Loading from './Loading'

var Dates = React.createClass({
    componentDidMount() {
        this.props.ImageActions.getDateImages()
    },

    handleDateChange(item) {
        this.props.FieldActions.clearActiveField()
        this.props.ImageActions.setActiveDate(item)
    },

    componentWillUnmount() {
        this.props.ImageActions.clearActiveDate()
    },

    render() {
        let dateItems = this.props.ImageStore.dates.map(item => {
            let dateNoTime = item.split('T')[0]
            let formatDate = moment(dateNoTime).format('MMMM Do YYYY')
            let active = ''
            if (this.props.ImageStore.activeDate) {
                active = item === this.props.ImageStore.activeDate
                    ? 'active' : ''
            }
            return <ListGroupItem key={item}
                onClick={this.handleDateChange.bind(this, item)}
                active={active}>{formatDate}</ListGroupItem>
        })

        return (
            <div>
                <ListGroup>
                    {dateItems}
                </ListGroup>
            </div>
        )
    }
})

export default Dates
