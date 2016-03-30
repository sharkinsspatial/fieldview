import React from 'react'
import AltContainer from 'alt-container'
import ImageStore from '../stores/ImageStore'
import ImageActions from '../actions/ImageActions'
import FieldStore from '../stores/FieldStore'
import FieldActions from '../actions/FieldActions'
import Farms from './Farms'
import Fields from './Fields'
import ImagesCompare from './ImagesCompare'
import ProductsCompare from './ProductsCompare'
import Grid from 'react-bootstrap/lib/Grid'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Loading from './Loading'
import Message from './Message'
import ListHeader from './ListHeader'
import ClearCompareImages from './ClearCompareImages'

var FieldsCompareContainer = React.createClass({
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
            loading: () => { return FieldStore.getState().loading },
            message: 'Loading your fields' } } >
            <Loading/>
        </AltContainer>
        <Row>
        <Col md={6}>
            <AltContainer stores={[FieldStore]} inject={ {
                listItems: () => { return FieldStore.getState().farmFields},
                text: 'Select A Field' } } >
                <ListHeader/>
            </AltContainer>
        </Col>
        <Col md={6}>
            <AltContainer stores={[ImageStore]} actions={ImageActions} inject={{
                listItems: () => { return ImageStore.getState().fieldImages},
                text: 'Select Dates' }}>
                <ListHeader/>
                <ClearCompareImages/>
            </AltContainer>
        </Col>
        </Row>
        <Row>
            <Col className={'fieldScroll'} md={6}>
                <AltContainer store={FieldStore} actions={FieldActions}>
                    <Fields/>
                </AltContainer>
            </Col>
            <Col className={'fieldScroll'} md={6}>
                <AltContainer stores={{ImageStore: ImageStore}}
                    actions={{ImageActions: ImageActions}}>
                    <ImagesCompare/>
                </AltContainer>
            </Col>
        </Row>
        <AltContainer stores={[ImageStore]} inject={ {
            loading: () => { return ImageStore.getState().loading },
            message: 'Loading your images' } } >
            <Loading/>
        </AltContainer>
        <AltContainer stores={[FieldStore]} inject={ {
            show: () => { return FieldStore.getState().unauthorizedField },
            message: 'You do not have any images available for this field' } } >
            <Message/>
        </AltContainer>
        <AltContainer stores={[ImageStore]} inject={ {
            show: () => { return ImageStore.getState().mapboxError },
            message: 'This image is still processing, please check back later' } } >
            <Message/>
        </AltContainer>
        <AltContainer stores={{ImageStore: ImageStore}}
            actions={{ImageActions: ImageActions}}>
            <ProductsCompare/>
        </AltContainer>
        </Grid>
        )
    }
})

export default FieldsCompareContainer
