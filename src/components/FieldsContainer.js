import React from 'react'
import alt from '../alt'
import AltContainer from 'alt-container'
import ImageStore from '../stores/ImageStore'
import ImageActions from '../actions/ImageActions'
import FieldStore from '../stores/FieldStore'
import FieldActions from '../actions/FieldActions'
import Farms from './Farms'
import Fields from './Fields'
import Images from './Images'
import Products from './Products'
import Grid from 'react-bootstrap/lib/Grid'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Loading from './Loading'
import Message from './Message'

var FieldsContainer = React.createClass({
    render() {
        return (
            <Grid fluid>
            <Row>
                <Col className={'farmScroll'} md={12}>
                    <AltContainer store={FieldStore} actions={FieldActions}>
                        <Farms/>
                    </AltContainer>
                </Col>
            </Row>
            <AltContainer stores={[FieldStore]} inject={ {
                loading: (props) => { return FieldStore.getState().loading },
                message: 'Loading your fields' } } >
                <Loading/>
            </AltContainer>
            <Row>
                <Col className={'fieldScroll'} md={6}>
                    <AltContainer store={FieldStore} actions={FieldActions}>
                        <Fields/>
                    </AltContainer>
                </Col>
                <Col className={'fieldScroll'} md={6}>
                    <AltContainer stores={{ImageStore: ImageStore}}
                        actions={{ImageActions: ImageActions}}>
                        <Images/>
                    </AltContainer>
                </Col>
            </Row>
            <AltContainer stores={[ImageStore]} inject={ {
                loading: (props) => { return ImageStore.getState().loading },
                message: 'Loading your images' } } >
                <Loading/>
            </AltContainer>
            <AltContainer stores={[FieldStore]} inject={ {
                show: (props) => { return FieldStore.getState().unauthorizedField },
                message: 'You do not have any images available for this field' } } >
                <Message/>
            </AltContainer>
            <AltContainer stores={{ImageStore: ImageStore}}
                actions={{ImageActions: ImageActions}}>
                <Products/>
            </AltContainer>
            </Grid>
        )
    }
})

export default FieldsContainer
