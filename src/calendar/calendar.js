import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./calendar.css";

export default (props) => {
  const [leaves, setLeaves] = useState([]);
  const [month, setMonth] = useState("");

  const dayLabels = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [tiles, setTiles] = useState([]);

  useEffect(() => {
    defaultMonth();
    getLeaves();
  }, []);

  const defaultMonth = () => {
    const date = new Date();
    setMonth(date.getFullYear() + "-" + (date.getMonth() + 1));
  };

  useEffect(() => {
    if (month != "") {
      buildCalendar();
    }
  }, [month]);

  const buildCalendar = () => {
    const date = new Date();
    date.setMonth(month.split("-")[1]);
    date.setFullYear(month.split("-")[0]);
    date.setDate(0);
    const days = date.getDate();
    let dayArr = new Array(days);
    dayArr = [...dayArr].map((d, i) => {
      let nd = { type: "date", date: i + 1 };
      let td =
        new Date(
          `${month.split("-")[1]}/${i + 1}/${month.split("-")[0]}`
        ).getTime() +
        86400 * 1000;
      leaves.filter((l) => {
        let from = new Date(l["from"]).getTime();
        let to = new Date(l["to"]).getTime() + 86400 * 1000;
        if (td >= from && td <= to) {
          nd = { ...nd, ...l };
        }
      });
      return { ...nd, today: td };
    });
    const firstday = new Date(
      `${month.split("-")[0]}/${month.split("-")[1]}/${1}`
    );
    let pastDays = new Array(firstday.getDay());
    pastDays = [...pastDays].map((p) => {
      return { type: "none" };
    });
    console.log(dayArr, pastDays);
    setTiles([...pastDays, ...dayArr]);
  };

  const getLeaves = async () => {
    const rs = await axios.get("http://localhost:9000/leaves");
    const dt = rs.data;
    setLeaves([...dt]);
  };

  const monthChange = (e) => {
    setMonth(e.target.value);
  };

  const changeSeleced = (t) => {
    props?.setSelected(t?.today);
  };

  const styles = { pending: "yellow", rejected: "red", accepted: "green" };

  return (
    <div className="cal-page">
      <input type="month" onChange={monthChange}></input>
      {month != "" && (
        <div>
          <div className="calendar">
            {dayLabels.map((t) => (
              <div className="label-tile">{t}</div>
            ))}
            {tiles.map((t) =>
              t.type == "date" ? (
                <div
                  className="tile date"
                  onClick={() => changeSeleced(t)}
                  style={{
                    backgroundColor: t["status"] && styles[t["status"]],
                  }}
                >
                  {t.date}
                </div>
              ) : (
                <div className="tile none no-border"></div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};
