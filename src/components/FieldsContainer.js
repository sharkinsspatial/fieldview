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
            <AltContainer stores={{ImageStore: ImageStore}}
                actions={{ImageActions: ImageActions}}>
                <Products/>
            </AltContainer>
            </Grid>
        )
    }
})

export default FieldsContainer
