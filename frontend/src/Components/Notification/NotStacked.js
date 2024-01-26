import React from "react";
import { MDBNotification, MDBContainer } from "mdbreact";

const NotStacked = (props) => {
  return (
    <div
      style={{
        width: "200px",
          position: "fixed",
          top: "10px",
          right: {base:'',xl:'10px'},
    
        zIndex: 9999
      }}
    >
     
      <MDBNotification
        show
        fade
        className="m-3" 
        iconClassName="text-primary"
        title={props.notification_type === "like_added" ? "Like":"Comment"}
        message={`Your post has been liked by ${props.by_user}`}
        text="2 seconds ago"
      />
    </div>
  );
};

export default NotStacked;
