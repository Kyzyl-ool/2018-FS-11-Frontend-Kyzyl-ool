import React, {Component} from 'react';
import './Header.css';
import UserIcon from './UserIcon/UserIcon';

class Header extends Component {
  constructor(props){
    super(props);

    this.dialogues = [
      {
        userName: 'Root',
      },
      {
        userName: "NonRoot",
      },
      {
        userName: 'ABRACADABRA',
      }
    ];
  }



  render() {
    return (
      <div className="Header">
        {this.dialogues.map((elem, index) => <UserIcon key={index} userName={elem.userName} />)}
      </div>
    );
  }
}


export default Header;
