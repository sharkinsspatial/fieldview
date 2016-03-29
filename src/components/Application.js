import alt from '../alt'
import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRedirect} from 'react-router'
import Grid from 'react-bootstrap/lib/Grid'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Panel from 'react-bootstrap/lib/Panel'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import {LinkContainer} from 'react-router-bootstrap'
import FieldsContainer from './FieldsContainer'
import LoginContainer from './LoginContainer'
import AuthenticationStore from '../stores/AuthenticationStore'
import DateFieldsContainer from './DateFieldsContainer'
import CustomersContainer from './CustomersContainer'
import CustomersLink from './CustomersLink'
import LogoContainer from './LogoContainer'
import ViewContainer from './ViewContainer'

class Application extends React.Component {
    render() {
        return (
            <div>
                <Navbar fluid fixedTop>
                <Navbar.Header>
                <Navbar.Brand>
                    <img className='logo-image' src='/css/logo.png'/>
                </Navbar.Brand>
                <LogoContainer/>
                <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav eventKey={0}>
                    <LinkContainer to='/dates'>
                        <NavItem eventKey={2}>Dates</NavItem>
                    </LinkContainer>
                    <LinkContainer to='/fields'>
                        <NavItem eventKey={1}>Fields</NavItem>
                    </LinkContainer>
                    <CustomersLink/>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
                <Grid fluid>
                <Row>
                <Col md={4}>
                <Panel>
                    {this.props.children}
                </Panel>
                </Col>
                <Col md={8}>
                    <ViewContainer/>
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
            <Route path='dates' component={DateFieldsContainer}
                onEnter={requireAuthorization}/>
            <Route path='fields' component={FieldsContainer}
                onEnter={requireAuthorization}/>
            <Route path='customers' component={CustomersContainer}
                onEnter={requireAuthorization}/>
            <IndexRedirect to='/dates'/>
            <Route path='login' component={LoginContainer}/>
        </Route>
    </Router>
), document.getElementById('content'))


