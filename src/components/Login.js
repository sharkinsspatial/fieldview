import React from 'react'
import classNames from 'classnames'
import Input from 'react-bootstrap/lib/Input'
import Collapse from 'react-bootstrap/lib/Collapse'
import Alert from 'react-bootstrap/lib/Alert'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = { loginLoading: false }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.customers.length > 0) {
            setTimeout(() => {
                this.props.history.pushState(null, 'customers', null)
            }, 0)
        }
        if (nextProps.customerId) {
            setTimeout(() => {
                this.props.history.pushState(null, '/', null)
            }, 0)
        }
        if (nextProps.loginError) {
            this.setState({ loginLoading: false })
        }
    }

    render() {
        let loginBtnClass = classNames({
            'fa': true,
            'fa-refresh': this.state.loginLoading,
            'fa-spin': this.state.loginLoading
        })
        let textClass = classNames({
            'text-center': true,
            'textPadding': true
        })

        return (
            <div>
                <div className={textClass}>
                <div>Login with your Field View account</div>
                </div>
                <Input type='text' label='Email' ref='loginEmail'/>
                <Input type='text' label='Password' ref='loginPassword'/>
                <div className='text-center'>
                    <a className='btn btn-default'
                        onClick={this.handleLoginClick}>
                    <i ref='btn' className={loginBtnClass}></i> Login</a>
                </div>
                <Collapse in={this.props.loginError}>
                    <Alert bsStyle='danger'>
                        <h5>{this.props.loginErrorMessage}</h5>
                    </Alert>
                </Collapse>
            </div>
        )
    }

    handleLoginClick = () => {
        this.setState({ loginLoading: true })
        let credentials = { 'email': this.refs.loginEmail.getValue(),
                'password': this.refs.loginPassword.getValue() }
        this.props.fetchToken(credentials)
    };
}

export default Login
