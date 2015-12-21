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
import DatesContainer from './DatesContainer'


class Application extends React.Component {

    render() {
        return (
            <div>
                <Navbar fluid fixedTop toggleNavKey={0}>
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
            <Route path='dates' component={DatesContainer}
                onEnter={requireAuthorization}/>
            <Route path='login' component={LoginContainer}/>
        </Route>
    </Router>
), document.getElementById('content'))


