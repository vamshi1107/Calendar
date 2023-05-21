import { useState } from "react";
import Calendar from "../calendar/calendar";
import Sidebar from "../sidebar/sidebar";
import "./home.css";

export default () => {
  const [selected, setSelected] = useState("-");

  return (
    <div className="page">
      <Calendar selected={selected} setSelected={setSelected}></Calendar>
      <Sidebar selected={selected} setSelected={setSelected}></Sidebar>
    </div>
  );
};
