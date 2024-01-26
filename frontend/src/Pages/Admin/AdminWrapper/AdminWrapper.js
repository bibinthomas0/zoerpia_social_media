import React from "react";
import LoginNav from "../../../Components/Navbar/LoginNav";
import { Route,Routes } from "react-router-dom";
import AdminLogin from "../AdminLogin";
import Adminregister from "../Adminregister";
import UserList from "../AdminUsers/UserList";
import CommentReport from "../CommentReport/CommentReport";
import PostReport from "../PostReport.js/PostReport";



function AdminWrapper() {
  return (
    <>
    <LoginNav/>
    <Routes>
    <Route path="/" element={<AdminLogin/>}/>
    <Route path="signup" element={<Adminregister/>}/>
    <Route path="users" element={<UserList/>}/>
    <Route path="Commentreports" element={<CommentReport/>}/>
    <Route path="postreports" element={<PostReport/>}/>
   


    </Routes> 
</>
  );
}

export default AdminWrapper;
