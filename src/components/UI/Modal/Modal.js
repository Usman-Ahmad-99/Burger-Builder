import React, { Component } from 'react';
import Classes from './Modal.module.css'
import Auxillary from '../../../hoc/Auxillary/auxillary'
import BackDrop from '../Backdrop/Backdrop'



class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState ){
        // if(nextProps.show !== this.props.show) {
             return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    render() {
        return(
        <Auxillary>
            <BackDrop show={this.props.show} clicked= {this.props.modalClosed} />
            <div className={Classes.Modal} style= {{transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)', opacity: this.props.show ? '1': '0'}}>
                {this.props.children}
            </div>
        </Auxillary>)
    }
}

export default Modal