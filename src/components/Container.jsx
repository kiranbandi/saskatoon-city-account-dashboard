import React, { Component } from 'react';
import { NavBar } from './';
import Loading from 'react-loading';
import { requestLogin, reIssueToken } from '../utils/requestServer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setLoginData } from '../redux/actions/actions';
import ReactTooltip from 'react-tooltip';

class Container extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPawsLoginLoader: false
        }
        this.onProgramChange = this.onProgramChange.bind(this);
    }

    // componentDidMount() {
    //     const { pawsTicket } = this.props.route;
    //     // if the base route was launched with a ticket then validate the ticket

    //     if (pawsTicket) {
    //         this.setState({ showPawsLoginLoader: true });
    //         requestLogin(pawsTicket)
    //             .then((user) => {
    //                 this.props.actions.setLoginData(user)
    //             })
    //             .catch((err) => { console.log(err) })
    //             .finally(() => {
    //                 this.setState({ showPawsLoginLoader: false });
    //             })
    //     }
    // }

    onProgramChange(program) {
        this.setState({ showPawsLoginLoader: true });
        reIssueToken(program.value)
            .then((user) => {
                this.props.actions.setLoginData(user)
            })
            .catch((err) => { console.log(err) })
            .finally(() => {
                this.setState({ showPawsLoginLoader: false });
            })
    }


    render() {

        const { showPawsLoginLoader } = this.state;

        return (
            <div id='app-container'>
                {/* navbar content , common for entire application */}
                <NavBar onProgramChange={this.onProgramChange} />
                {showPawsLoginLoader ?
                    <Loading type='spin' className='paws-loader' height='100px' width='100px' color='#d6e5ff' delay={-1} />
                    : <div id='container-body'>
                        {this.props.children}
                        {/* mounting react info tooltip wrapper */}
                        <ReactTooltip place="top" type="info" effect="solid" />
                    </div>
                }
                <footer className="footer w-full m-t hidden-xs">
                    <div className="container-fluid">
                        <div className='w-md footer-inner'>
                            <span className="left text-xs-left">
                                <a className="footer-link" href="mailto:venkat.bandi@usask.ca?subject=CBD Dashboard&amp;body=Please%20Fill%20">Contact Us</a>
                            </span>
                        </div>
                        <div className='w-md footer-inner text-xs-right'>
                            <a className="footer-link right" href="http://vga.usask.ca/"> VGA Lab University of Saskatchewan</a>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ setLoginData }, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(Container);