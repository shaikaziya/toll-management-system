import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import NewTollBox from "../Component/NewTollBox";
import NewEntryBox from "../Component/NewEntryBox";

function TollList() {
  let tolls = JSON.parse(localStorage.getItem("tolls"));
  const [getTolls, setGetTolls] = useState(tolls);
  const [tName, setTname] = useState("");
  const [newToll, setNewToll] = useState(false);
  const [newEntry, setNewEntry] = useState(false);
  let navigate = useNavigate();
  let data;

  let handleDelete = (id) => {
    console.log(id);
    let index = getTolls.findIndex((obj) => obj.id === id);
    console.log(index);
    getTolls.splice(index, 1);
    setGetTolls([...getTolls]);
  };

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
          <h4 className="">Toll Gate List</h4>
        </div>
        <div className="center">
          <div>
            <input
              type="text"
              placeholder="search a toll"
              className="search"
              onChange={(e) => setTname(e.target.value)}
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

          <button className="button" onClick={() => navigate("/")}>
            Back to vechile logs
          </button>
        </div>
      </div>
      <div className="table">
        <table style={{ width: "80%" }}>
          <thead>
            <tr>
              <th>Toll Name</th>
              <th>Car/Jeep/Van</th>
              <th>LCV</th>
              <th>Truck/Bus</th>
              <th>Heavy Vechile</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              (data = getTolls
                .filter((entry) => {
                  if (tName === "") {
                    return entry;
                  } else if (
                    entry.tollName.toLowerCase().includes(tName.toLowerCase())
                  ) {
                    return entry;
                  }
                })
                .map((entry) => {
                  return (
                    <tr key={entry.id} id="tr">
                      <td>{entry.tollName}</td>
                      <td>{`${entry.single1}/${entry.double1}`}</td>
                      <td>{`${entry.single2}/${entry.double2}`}</td>
                      <td>{`${entry.single3}/${entry.double3}`}</td>
                      <td>{`${entry.single4}/${entry.double4}`}</td>
                      <td>
                        <MdDelete
                          size={"25px"}
                          onClick={() => handleDelete(entry.id)}
                          className="delete"
                        />
                      </td>
                    </tr>
                  );
                }))
            }
            {data.length === 0 ? (
              <tr>
                <td colSpan={6}>No Tolls Found</td>
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

export default TollList;
