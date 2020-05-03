import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Login extends Component{
    constructor(){
        super();
        this.state={
            username: '',
            password: '',
            message: ''
        };
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);

    }
    //checking if you are authenticated or not
    onSubmit =(e) => {

        e.preventDefault(); //prevents autofills

        const {username, password } = this.state;
        axios.post('/api/auth/login', {username, password})
        .then((result) => {
            localStorage.setItem('jwtToken', result.data.token);
            this.setState({message: ''});
            this.props.history.push('/');

        })
        .catch((error) => {
            if(error.response.status === 401){
                this.setState({message: 'Login failed. Not Authorized'})
            }
        })

    }

    render(){
        const { username, password, message } = this.state;
        return(
            <div class="container">
                <form onSubmit={this.onSubmit}>
                    {message !== '' && <div class="alert alert-warning alert-dismissible" role="alert">
                        {message}
                        </div>}
                    <h2 class="form-signin-heading">Please Login</h2>
                    <label for="inputEmail" class="sr-only">Email Address</label>
                    <input type="email" class="form-control" placeholder="Enter Email Address" name="username" value={username} onChange={this.onChange} required></input>

                    <label for="inputPassword" class="sr-only">Enter Password</label>
                    <input type="password" class="form-control" placeholder="Enter Password" name="password" value={password} onChange={this.onChange} required></input>

                    <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>

                    <p>
                        Not a member?
                        <Link to="/register">Register</Link>
                    </p>
                </form>
            </div>
        )
    }
}

export default Login;