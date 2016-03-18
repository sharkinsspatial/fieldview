import React from 'react'
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
import Message from './Message'
import ListHeader from './ListHeader'
import SwitchMapView from './SwitchMapView'

var DateFieldsContainer = React.createClass({
    render() {
        return (
        <Grid fluid>
        <AltContainer stores={[ImageStore]} inject={ {
            loading: () => { return ImageStore.getState().loadingDates },
            message: 'Loading your images' } } >
            <Loading/>
        </AltContainer>
        <AltContainer store={ImageStore} actions={ImageActions}>
            <SwitchMapView/>
        </AltContainer>
        <Row>
        <Col md={6}>
            <AltContainer stores={[ImageStore]} inject={ {
                listItems: () => { return ImageStore.getState().dates},
                text: 'Select A Date' } } >
                <ListHeader/>
            </AltContainer>
        </Col>
        <Col md={6}>
            <AltContainer stores={[ImageStore]} inject={ {
                listItems: () => { return ImageStore.getState().dateFields},
                text: 'Select A Field' } } >
                <ListHeader/>
            </AltContainer>
        </Col>
        </Row>
        <Row>
        <Col className={'scroll'} md={6}>
            <AltContainer stores={{ImageStore: ImageStore, FieldStore: FieldStore}}
                actions={{ImageActions: ImageActions, FieldActions: FieldActions}}>
                <Dates className={'scroll'}/>
            </AltContainer>
        </Col>
        <Col className={'scroll'} md={6}>
            <AltContainer stores={{ImageStore: ImageStore, FieldStore: FieldStore}}
                actions={{ImageActions: ImageActions, FieldActions: FieldActions}}>
                <DateFields/>
            </AltContainer>
        </Col>
        </Row>
        <AltContainer stores={[ImageStore]} inject={ {
            show: () => { return ImageStore.getState().mapboxError },
            message: 'This image is still processing, please check back later' } } >
            <Message/>
        </AltContainer>
        <AltContainer stores={{ImageStore: ImageStore, FieldStore: FieldStore}}
            actions={{ImageActions: ImageActions, FieldActions: FieldActions}}>
            <Products/>
        </AltContainer>
        </Grid>
        )
    }
})

export default DateFieldsContainer
