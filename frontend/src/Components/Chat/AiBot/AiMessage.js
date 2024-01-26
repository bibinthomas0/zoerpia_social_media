import React from "react";

const AiMessage = () => {
  return (
<>
    <div className="d-flex flex-row justify-content-start mb-4">
    <img
      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
      alt="avatar 1"
      style={{ width: "45px", height: "100%" }}
    />
    <div>
      <p
        className="small p-2 ms-3 mb-1 rounded-3"
        style={{ backgroundColor: "#f5f6f7" }}
      >
        Sorry I don't have. i changed my phone.
      </p>
      <p className="small ms-3 mb-3 rounded-3 text-muted">
        00:13
      </p>
    </div>
  </div>

  <div className="d-flex flex-row justify-content-end">
    <div>
      <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
        Okay then see you on sunday!!
      </p>
      <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
        00:15
      </p>
    </div>
    <img
      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
      alt="avatar 1"
      style={{ width: "45px", height: "100%" }}
    />
  </div>
  </>

  )
};

export default AiMessage;
