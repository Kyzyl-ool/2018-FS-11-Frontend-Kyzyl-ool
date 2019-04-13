import React, {useState} from 'react';
import styles from './Cross.module.css';

function Cross(props) {
  const [name] = useState(props.name);

  const onClick = (e) => {
    e.preventDefault();
    if (window.confirm(`Are you sure want to delete chat "${name}"?`))
      alert("Deleted");
  };

  return <div onClick={onClick} className={styles.Cross}>⨉</div>
}

export default Cross;
