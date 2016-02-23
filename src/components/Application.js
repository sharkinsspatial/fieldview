import alt from '../alt'
import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute} from 'react-router'
import Grid from 'react-bootstrap/lib/Grid'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Panel from 'react-bootstrap/lib/Panel'
import AltContainer from 'alt-container'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import {LinkContainer} from 'react-router-bootstrap'
import ImageSelector from './ImageSelector'
import LoginContainer from './LoginContainer'
import AuthenticationStore from '../stores/AuthenticationStore'
import MapContianer from './MapContainer'
import DateFieldsContainer from './DateFieldsContainer'
import NavBrand from 'react-bootstrap/lib/NavBrand'

class Application extends React.Component {

    render() {
        return (
            <div>
                <Navbar fluid fixedTop toggleNavKey={0}>
                    <NavBrand>
                    <img src='/css/logo.png'/>
                    </NavBrand>
                    <Nav right eventKey={0}>
                    <LinkContainer to='/fields'>
                        <NavItem eventKey={1}>Fields</NavItem>
                    </LinkContainer>
                    <LinkContainer to='/'>
                        <NavItem eventKey={2}>Dates</NavItem>
                    </LinkContainer>
                    </Nav>
                </Navbar>
                <Grid fluid>
                <Row>
                <Col className={'scroll'} md={4}>
                <Panel>
                    {this.props.children}
                </Panel>
                </Col>
                <Col md={8}>
                    <MapContianer/>
                </Col>
                </Row>
                </Grid>
            </div>
        )
    }
}

function requireAuthorization(nextState, replaceState) {
    if(!AuthenticationStore.isLoggedIn()) {
        replaceState({ nextPathname: nextState.location.pathname }, '/login')
    }
}

ReactDOM.render((
    <Router>
        <Route path='/' component={Application}>
            <Route path='fields' component={ImageSelector}
                onEnter={requireAuthorization}/>
            <IndexRoute component={DateFieldsContainer}
                onEnter={requireAuthorization}/>
            <Route path='login' component={LoginContainer}/>
        </Route>
    </Router>
), document.getElementById('content'))


