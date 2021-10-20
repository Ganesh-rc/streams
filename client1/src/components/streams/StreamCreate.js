import React from 'react';
import { Field, formValues, reduxForm } from 'redux-form';
// Field is supposed to be a react component that we will eventually show on screen - s0, capital
// reduxForm is a function 
import { connect } from 'react-redux';
import { createStream } from '../../actions'

class StreamCreate extends React.Component{
    renderError( { error, touched} ){
        if (touched && error ){
            return(
            <div className="ui error message">
                <div className="header">{error}</div>
            </div>);
        }
    }

    // meta property from formProps is related to validate function
    renderInput = ({input, label, meta}) => {
        // console.log(meta);
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
        <div className={className}>
            <label>{label} : </label>
            <input {...input}/>
            {this.renderError(meta)}
        </div>)
    }

    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    }

    render(){
        return (
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
            <Field name="title" component={this.renderInput} label="Enter Title"/>
            <Field name="description" component={this.renderInput} label="Enter Description"/>
            <button className="ui button primary">Submit</button>
        </form>
        );
    };
};

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title){
        errors.title = "you must enter a title"
    };
    if (!formValues.description){
        errors.description = "you must enter a description"
    }; 
    return errors;
};

// reduxForm generates allows us to use formState in forComponent
// reduxForm will return a function we immediately call that function with streamCreate
// reduxForm only takes one single object.
// form : formName 
const formWrapped = reduxForm({
    form: 'streamCreate',
    validate: validate
})(StreamCreate);

export default connect(null, {
    createStream: createStream
})(formWrapped);