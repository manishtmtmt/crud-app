import React from "react";
import { Route, Routes } from "react-router-dom";
import ReqAuth from "../hoc/ReqAuth";
import EditPage from "../Pages/EditPage";
import Homepage from "../Pages/Homepage";
import Signin from "../Pages/Signin";
import Signup from "../Pages/Signup";
import TodoApp from "../Pages/TodoApp";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route
        path="/todoapp"
        element={
          <ReqAuth>
            <TodoApp />
          </ReqAuth>
        }
      />
      <Route
        path="/todoapp/task/:id"
        element={
          <ReqAuth>
            <EditPage />
          </ReqAuth>
        }
      />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default MainRoutes;
