import React, { Component } from 'react';
import './VKeyboard.css';
import Aux from '../../../hoc/Aux/Aux';
import {connect} from 'react-redux';


class VKeyboard extends Component {
  componentDidMount() {
    console.log(this.props.isEnabled);
  }


  render() {
    return (
      <Aux>
        <div className='VKeyboard' hidden={!this.props.isEnabled}>
          HELLO
        </div>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return  {
    isEnabled: state.msgform.isVKeyboardEnabled
  }
};


export default connect(mapStateToProps)(VKeyboard);
