import React from 'react'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import moment from 'moment'
import Loading from './Loading'

var Dates = React.createClass({
    componentDidMount() {
        this.props.getImages()
    },
    render() {
        let dateItems = this.props.dates.map(item => {
            let dateNoTime = item.split('T')[0]
            let formatDate = moment(dateNoTime).format('MMMM Do YYYY')
            return <ListGroupItem key={item}>{formatDate}</ListGroupItem>
        })

        return (
            <div>
                <ListGroup>
                    {dateItems}
                </ListGroup>
                <Loading loading={this.props.loading}
                    message={'Loading your images'}/>
            </div>
        )
    }
})

export default Dates
