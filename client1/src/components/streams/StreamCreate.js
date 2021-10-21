import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions'
import StreamForm from './StreamForm';

class StreamCreate extends React.Component{ 
    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    }

    render(){
        return (
            <div>   
                <h3>Create a stream</h3>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        );
    };
};


// reduxForm generates allows us to use formState in forComponent
// reduxForm will return a function we immediately call that function with streamCreate
// reduxForm only takes one single object.
// form : formName 

export default connect(null, {
    createStream: createStream
})(StreamCreate);


