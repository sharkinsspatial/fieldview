import alt from '../alt'
import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute} from 'react-router'
import Grid from 'react-bootstrap/lib/Grid'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Panel from 'react-bootstrap/lib/Panel'
import Map from './Map'
import AltContainer from 'alt-container'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import {LinkContainer} from 'react-router-bootstrap'


class Application extends React.Component {
    componentDidMount() {
        //ReportStore.getReports()
    }

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
                <Map/>
                </Col>
                </Row>
                </Grid>
            </div>
        )
    }
}

function requireAuthorization(nextState, replaceState) {
    //if(!AuthenticationStore.isLoggedIn()) {
        //if (nextState.location.query.access_token) {
            //let login = {token: nextState.location.query.access_token,
                //userId: nextState.location.query.userId}
            //AuthenticationActions.login(login)
        //}
        //else {
            //replaceState({ nextPathname: nextState.location.pathname }, '/login')
        //}
    //}
}

ReactDOM.render((
    <Router>
        <Route path='/' component={Application}>
        </Route>
    </Router>
), document.getElementById('content'))


