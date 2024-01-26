import React, { useEffect, useState } from "react";
import Usercreation from "./Usercreation";
import OtpVerification from "../../InBoth/OtpVerification";
import { useSelector } from "react-redux";

function Register() {
  const [childData, setChildData] = useState(false);

  const handleChildData = (data) => {
    setChildData(data);
  };
  
  
  return (
    <div>
      {childData ? (
        <OtpVerification />
      ) : (
        <Usercreation onChildData={handleChildData}  />
      )}
    </div>
  );
}

export default Register;
