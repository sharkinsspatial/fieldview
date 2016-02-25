import React from 'react'
import alt from '../alt'
import AltContainer from 'alt-container'
import ImageStore from '../stores/ImageStore'
import ImageActions from '../actions/ImageActions'
import FieldStore from '../stores/FieldStore'
import FieldActions from '../actions/FieldActions'
import Dates from './Dates'
import DateFields from './DateFields'
import Products from './Products'
import Grid from 'react-bootstrap/lib/Grid'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Loading from './Loading'

var DateFieldsContainer = React.createClass({
    render() {
        return (
                <Grid fluid>
                <AltContainer stores={[ImageStore]} inject={ {
                    loading: (props) => { return ImageStore.getState().loadingDates },
                    message: 'Loading your images' } } >
                    <Loading/>
                </AltContainer>
                <Row>
                <Col className={'scroll'} md={6}>
                    <AltContainer stores={{ImageStore: ImageStore, FieldStore: FieldStore}}
                        actions={{ImageActions: ImageActions, FieldActions: FieldActions}}>
                        <Dates/>
                    </AltContainer>
                </Col>
                <Col className={'scroll'} md={6}>
                    <AltContainer stores={{ImageStore: ImageStore, FieldStore: FieldStore}}
                        actions={{ImageActions: ImageActions, FieldActions: FieldActions}}>
                        <DateFields/>
                    </AltContainer>
                </Col>
                </Row>
                <AltContainer stores={{ImageStore: ImageStore, FieldStore: FieldStore}}
                    actions={{ImageActions: ImageActions, FieldActions: FieldActions}}>
                    <Products/>
                </AltContainer>
                </Grid>
        )
    }
})

export default DateFieldsContainer
