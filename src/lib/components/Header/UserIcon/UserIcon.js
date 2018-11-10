import React, {Component} from 'react';
import './UserIcon.css';
import {BrowserRouter as Router, Link} from 'react-router-dom';

class UserIcon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: props.userName
    }
  }



  render() {
    return (
      <Router>
        <Link to={{
          pathname: 'dialogue',
          search: `?user=${this.state.userName}`
        }
        }>
            <div className="UserIcon">
              {this.state.userName}
            </div>
        </Link>
      </Router>
    );
  }
}

export default UserIcon;
