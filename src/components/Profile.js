import React from 'react';
import { getUser, removeUserSession } from '../Utils/Common';
import Button from '@material-ui/core/Button';

function Dashboard(props) {

    const user = getUser();
   
    // handle click event of logout button
    const handleLogout = () => {
      removeUserSession();
      props.history.push('/Login');
    }

  return (
    <div className = "FormBackground1">
    <div className = "FormBackground2">
    <div className = "FormTitle">
      Welcome {user.username}!
    </div>
    <div className ="FormBackground1">
    <Button className="CreateButton" onClick={handleLogout}  > Logout</Button>
    </div>
    </div>
    </div>
  );
}

export default Dashboard;