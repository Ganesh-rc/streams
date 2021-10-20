import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions'

class GoogleAuth extends React.Component {
    state = { isSignedIn: null}
    // we wired gspi library to project, we loaded some additional code to library,
    // then we initialized some authencation with our client Id and ask for a scope o email
    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init
            ({clientId:'113713252572-di6n1i8g3stgpl145tq1ujluka5j4fin.apps.googleusercontent.com', scope: 'email'})
            .then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    };

    onAuthChange = (isSignedIn) => {
        // this.setState({ isSignedIn: this.auth.isSignedIn.get()});
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };
    
    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton(){
        if(this.props.isSignedIn === null){
            return null;
        }
        else if(this.props.isSignedIn){
            return (
            <button onClick={this.onSignOutClick} className="ui red google button">
                <i className="google icon" />signOut
            </button>)
        }
        else{
            return (
            <button onClick={this.onSignInClick} className="ui green google button">
                <i className="google icon" />sign in
            </button>)
        }
    }

    render() {
        return (
        <div>{this.renderAuthButton()}</div>
        );
    }
};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn}
};

export default connect(mapStateToProps,
    {
        signIn : signIn,
        signOut : signOut
    })(GoogleAuth);


