import { useEffect, useState } from "react";
import "./sidebar.css";

export default ({ selected, setSelected }) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    handleHide();
  }, [selected]);

  const handleHide = () => {
    if (selected == "-") {
      setHidden(true);
    } else {
      setHidden(false);
    }
  };

  const hide = () => {
    setSelected("-");
  };

  return !hidden ? (
    <div className={"sidebar"}>
      <div className="close-con">
        <button onClick={hide} className="close-button">
          close
        </button>
      </div>
      <div className="event-con">
        {[...new Array(24)].map((e, i) => (
          <div className="eve-time">{i}</div>
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
};
