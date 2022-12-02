import React, { useEffect } from "react";
import "./home.css";
import { BiFilterAlt } from "react-icons/bi";

import { useState } from "react";
import NewTollBox from "../Component/NewTollBox";
import NewEntryBox from "../Component/NewEntryBox";
import { useNavigate } from "react-router-dom";
import { defaultEntry, defaultTolls } from "../dummydata";

function Home() {
  let tollEntries = JSON.parse(localStorage.getItem("entry"));
  let tolls = JSON.parse(localStorage.getItem("tolls"));
  const [getTolls, setGetTolls] = useState(tolls);
  const [vNo, setVno] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [tollName, setTollName] = useState("");
  const [newToll, setNewToll] = useState(false);
  const [newEntry, setNewEntry] = useState(false);
  let navigate = useNavigate();
  let data;
  if (!tollEntries) localStorage.setItem("tolls", JSON.stringify(defaultTolls));
  if (!tolls) localStorage.setItem("entry", JSON.stringify(defaultEntry));
  useEffect(() => {
    localStorage.setItem("tolls", JSON.stringify(getTolls));
  }, [getTolls]);

  return (
    <>
      <div>
        <h2 className="title">Toll Management System</h2>
        <hr className="border" />
      </div>
      <div className="container">
        <div className="left">
          <h4 className="">Toll entries/Vehicle entries</h4>
          <div className="dropdown">
            <BiFilterAlt
              className="dropdown-btn"
              size={"25px"}
              style={{ color: "#377ef6" }}
              onClick={() => setIsActive(!isActive)}
            />
            <div className="dropdown-content">
              {isActive && (
                <div className="dropdown-item" onClick={() => setTollName("")}>
                  All
                </div>
              )}
              {isActive &&
                [
                  ...new Map(
                    tolls.map((entry) => [entry.tollName, entry])
                  ).values(),
                ].map((entry, key) => {
                  return (
                    <div
                      className="dropdown-item"
                      key={key}
                      onClick={() => setTollName(entry.tollName)}
                    >
                      {entry.tollName}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="center">
          <div>
            <input
              type="text"
              placeholder="search vehicle"
              className="search"
              onChange={(e) => setVno(e.target.value)}
            />
          </div>
        </div>
        <div className="right">
          <button className="button" onClick={() => setNewEntry(!newEntry)}>
            Add vechile entry
          </button>
          <button className="button" onClick={() => setNewToll(!newToll)}>
            Add new toll
          </button>

          <button className="button" onClick={() => navigate("/tolllist")}>
            View all tolls
          </button>
        </div>
      </div>

      <div className="table">
        <table style={{ width: "80%" }}>
          <thead>
            <tr>
              <th>Vechile Type</th>
              <th>Vechile Number</th>
              <th>Date/Time</th>
              <th>Toll Name</th>
              <th>Tariff</th>
            </tr>
          </thead>
          <tbody>
            {
              (data = tollEntries
                .filter((entry) => {
                  if (vNo === "") {
                    return entry;
                  } else if (
                    entry.vechileNo.toLowerCase().includes(vNo.toLowerCase())
                  ) {
                    return entry;
                  }
                })
                .filter((entry) => {
                  if (tollName === "") {
                    return entry;
                  } else if (entry.tollname.includes(tollName)) {
                    return entry;
                  }
                })
                .map((entry) => {
                  return (
                    <tr>
                      <td>{entry.vechileType}</td>
                      <td>{entry.vechileNo}</td>
                      <td>{entry.date}</td>
                      <td>{entry.tollname}</td>
                      <td>{entry.tariff}</td>
                    </tr>
                  );
                }))
            }
            {data.length === 0 ? (
              <tr>
                <td colSpan={5}>No Vechile Found</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      {newToll && (
        <NewTollBox
          newToll={newToll}
          setNewToll={setNewToll}
          getTolls={getTolls}
          setGetTolls={setGetTolls}
        />
      )}
      {newEntry && (
        <NewEntryBox newEntry={newEntry} setNewEntry={setNewEntry} />
      )}
    </>
  );
}

export default Home;
