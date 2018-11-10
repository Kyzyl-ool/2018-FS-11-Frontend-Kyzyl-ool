import React, {Component} from 'react';
import './UserIcon.css';

class UserIcon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: props.userName
    }
  }

  render() {
    return (
      <div className="UserIcon">
        {this.state.userName}
      </div>
    );
  }
}

export default UserIcon;
