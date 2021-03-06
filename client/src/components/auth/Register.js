import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from "../../actions/authActions";

//For bootstrap
//className: {classnames(default-class-name, { 'is-invalid' : input_validation})}
//input_validation && (<div className = "invalid-feedback"></d>
//input_validation: from backend, can be used to check for the specific input


class Register extends Component {
    constructor(){
        super();
        this.state={
            name: '',
            email: '',
            password: '',
            confirmPass:'',
            errors: { }
        }

        //bind event handler
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value

        });
    }
    onSubmit(e){
        e.preventDefault();
        const newUser= {
            name: this.state.name,
            email: this.state.email,
            password:this.state.password,
            confirmPass: this.state.confirmPass
        };

        this.props.registerUser(newUser);


    }

    render() {
        const { errors } =this.state;
        const { user } = this.props.auth;
        return (
            <div>
                <div className="register">
                    {user ? user.name : null}
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">Sign Up</h1>
                                <p className="lead text-center">Create your InfoxConnect account</p>
                                <form noValidate onSubmit={this.onSubmit}>

                                    <div className="form-group">
                                        <input type="text" className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.name
                                        })} placeholder="Name" name="name" value= {this.state.name}  onChange={this.onChange} />

                                        {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                                    </div>

                                    <div className="form-group">
                                        <input type="email" className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.email
                                        })} placeholder="Email Address" name="email"  value= {this.state.email} onChange={this.onChange}/>
                                        <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>

                                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                                    </div>

                                    <div className="form-group">
                                        <input type="password" className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.password
                                        })} placeholder="Password" name="password" value= {this.state.password} onChange={this.onChange}/>

                                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                    </div>

                                    <div className="form-group">
                                        <input type="password" className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.confirmPass
                                        })}  placeholder="Confirm Password" name="confirmPass" value= {this.state.confirmPass} onChange={this.onChange} />

                                        {errors.confirmPass && (<div className="invalid-feedback">{errors.confirmPass}</div>)}
                                    </div>

                                    <input type="submit" className="btn btn-info btn-block mt-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
//To use state as props in the components
//state.auth here comes from root reducer
const mapStateToProps = (state)=>({
    auth: state.auth,
    errors: state.errors
});

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {registerUser})(Register);
