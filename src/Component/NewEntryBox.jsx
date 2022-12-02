import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useState } from "react";
import "./modal.css";

function NewEntryBox({ newEntry, setNewEntry }) {
  let localTolls = JSON.parse(localStorage.getItem("tolls"));
  let localEntry = JSON.parse(localStorage.getItem("entry"));

  if (!localEntry) {
    localStorage.setItem("entry", "[]");
  }

  const [entry, setEntry] = useState(localEntry);

  useEffect(() => {
    localStorage.setItem("entry", JSON.stringify(entry));
  }, [entry]);
  let today = new Date();
  let formik = useFormik({
    initialValues: {
      id: localEntry.length + 1,
      tollname: "",
      vechileType: "",
      vechileNo: "",
      tariff: "",
      date:
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear() +
        "," +
        today.getHours() +
        ":" +
        today.getMinutes() +
        ":" +
        today.getSeconds(),
      stdDate: today,
    },
    validate: (values) => {
      let errors = {};
      if (!values.tollname) {
        errors.tollname = "Please enter tollname";
      }
      if (!values.vechileType) {
        errors.vechileType = "Please select vechileType";
      }
      if (!values.vechileNo) {
        errors.vechileNo = "Please enter Vechile Number";
      }
      if (!values.tariff) {
        errors.tariff = "Not Selected";
      }

      return errors;
    },
    onSubmit: (values) => {
      setEntry([
        ...entry,
        {
          ...values,
        },
      ]);

      alert("New entry added");
      setTimeout(() => setNewEntry(!newEntry), 1000);
    },
  });
  {
    localTolls
      .filter((toll) => {
        if (toll.tollName === formik.values.tollname) {
          return toll;
        }
      })
      .filter((toll) => {
        if (formik.values.vechileNo === toll.vechileNo) {
          if (today - toll.stdDate < 60 * 60 * 1000) {
            if (formik.values.vechileType === toll.vechileType1) {
              formik.values.tariff = toll.double1;
            } else if (formik.values.vechileType === toll.vechileType2) {
              formik.values.tariff = toll.double2;
            } else if (formik.values.vechileType === toll.vechileType3) {
              formik.values.tariff = toll.double3;
            } else if (formik.values.vechileType === toll.vechileType4) {
              formik.values.tariff = toll.double4;
            }
          }
        } else {
          if (formik.values.vechileType === toll.vechileType1) {
            formik.values.tariff = toll.single1;
          } else if (formik.values.vechileType === toll.vechileType2) {
            formik.values.tariff = toll.single2;
          } else if (formik.values.vechileType === toll.vechileType3) {
            formik.values.tariff = toll.single3;
          } else if (formik.values.vechileType === toll.vechileType4) {
            formik.values.tariff = toll.single4;
          }
        }
      });
  }

  return (
    <div className="container1">
      <div className="modal-container">
        <div className="heading">
          <h3>Add New Vechile Entry</h3>
        </div>
        <form className="content" onSubmit={formik.handleSubmit}>
          <div className="group">
            <label htmlFor="tollname">Select Toll Name</label>
            <select
              name="tollname"
              id="tollname"
              value={formik.values.tollname}
              onChange={formik.handleChange}
              style={formik.errors.tollname ? { borderColor: "red" } : null}
            >
              <option>Select Toll name</option>
              {localTolls.map((item, key) => {
                return (
                  <option key={key} value={item.tollName}>
                    {item.tollName}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="group">
            <label htmlFor="vechileType">Select Vechile Type</label>
            <select
              name="vechileType"
              id="vechileType"
              value={formik.values.vechileType}
              onChange={formik.handleChange}
              style={formik.errors.vechileType ? { borderColor: "red" } : null}
            >
              <option>Select vechile type</option>
              <option value="car/jeep/van">Car/Jeep/Van</option>
              <option value="lcv">LCV</option>
              <option value="truck/bus">Truck/Bus</option>
              <option value="heavy-vechile">Heavy Vechile</option>
            </select>
          </div>

          <div className="group">
            <label htmlFor="vechileNo">Vechile Number</label>
            <input
              type="text"
              placeholder="enter vechile no"
              id="vechileNo"
              name="vechileNo"
              onChange={formik.handleChange}
              value={formik.values.vechileNo.toUpperCase()}
              style={formik.errors.vechileNo ? { borderColor: "red" } : null}
            />
          </div>

          <div className="group">
            <label htmlFor="tariff">Tariff</label>
            <input
              type="text"
              placeholder="Tariff Amount"
              id="tariff"
              name="tariff"
              value={formik.values.tariff}
              disabled
              style={formik.errors.tariff ? { borderColor: "red" } : null}
            />
          </div>

          <div className="btn-group">
            <button className="btn" type="submit">
              Add Entry
            </button>
            <button
              className="btn"
              type="cancel"
              onClick={() => setNewEntry(!newEntry)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewEntryBox;
