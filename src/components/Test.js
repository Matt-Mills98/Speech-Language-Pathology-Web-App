import React from 'react';
import { getUser, removeUserSession } from '../Utils/Common';

function Dashboard(props) {

    const user = getUser();
   
    // handle click event of logout button
    const handleLogout = () => {
      removeUserSession();
      props.history.push('/Login');
    }

  return (
    <div>
      Welcome User!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}

export default Dashboard;