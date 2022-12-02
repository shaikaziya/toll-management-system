import { useFormik } from "formik";
import React, { useEffect } from "react";
import "./modal.css";

function NewTollBox({ newToll, setNewToll, getTolls, setGetTolls }) {
  let localTolls = JSON.parse(localStorage.getItem("tolls"));
  console.log(getTolls)
  // if (!localTolls) {
  //   localStorage.setItem("tolls", "[]");
  // }

  // useEffect(() => {
  //   localStorage.setItem("tolls", JSON.stringify(getTolls));
  // }, [getTolls]);

  let formik = useFormik({
    initialValues: {
      id: localTolls[localTolls.length - 1].id + 1,
      tollName: "",

      vechileType1: "",
      single1: "",
      double1: "",

      vechileType2: "",
      single2: "",
      double2: "",

      vechileType3: "",
      single3: "",
      double3: "",

      vechileType4: "",
      single4: "",
      double4: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.tollName) {
        errors.tollName = "Please enter tollname";
      }
      if (!values.vechileType1) {
        errors.vechileType1 = "Please select vechileType";
      }
      if (!values.single1) {
        errors.single1 = "Please enter single journey fare";
      }
      if (!values.double1) {
        errors.double1 = "Please enter double journey fare";
      }
      if (!values.vechileType2) {
        errors.vechileType2 = "Please select vechileType";
      }
      if (!values.single2) {
        errors.single2 = "Please enter single journey fare";
      }
      if (!values.double2) {
        errors.double2 = "Please enter double journey fare";
      }
      if (!values.vechileType3) {
        errors.vechileType3 = "Please select vechileType";
      }
      if (!values.single3) {
        errors.single3 = "Please enter single journey fare";
      }
      if (!values.double3) {
        errors.double3 = "Please enter double journey fare";
      }
      if (!values.vechileType4) {
        errors.vechileType4 = "Please select vechileType";
      }
      if (!values.single4) {
        errors.single4 = "Please enter single journey fare";
      }
      if (!values.double4) {
        errors.double4 = "Please enter double journey fare";
      }

      return errors;
    },
    onSubmit: (values) => {
      setGetTolls([
        ...getTolls,
        {
          ...values,
        },
      ]);

      alert("New toll added");
      setTimeout(() => setNewToll(!newToll), 1000);
      // setNewToll(!newToll)
    },
  });
  return (
    <div className="container1">
      <div className="modal-container">
        <div className="heading">
          <h3>Add New Toll</h3>
        </div>
        <form className="content" onSubmit={formik.handleSubmit}>
          <div className="top-content">
            <label htmlFor="tollName">Toll Name</label>
            <input
              type="text"
              id="tollName"
              placeholder="Enter toll name"
              name="tollName"
              value={formik.values.tollName}
              onChange={formik.handleChange}
              style={formik.errors.tollName ? { borderColor: "red" } : null}
            />
          </div>

          <div className="bottom-content">
            <h3>Vechile Fare Details</h3>

            {/* group1 */}
            <div className="group">
              <select
                name="vechileType1"
                id="vechileType1"
                value={formik.values.vechileType1}
                onChange={formik.handleChange}
                style={
                  formik.errors.vechileType1 ? { borderColor: "red" } : null
                }
              >
                <option>Select vechile type</option>
                <option value="car/jeep/van">Car/Jeep/Van</option>
                <option value="lcv">LCV</option>
                <option value="truck/bus">Truck/Bus</option>
                <option value="heavy-vechile">Heavy Vechile</option>
              </select>

              <input
                type="number"
                placeholder="Single Journey"
                name="single1"
                value={formik.values.single1}
                onChange={formik.handleChange}
                style={formik.errors.single1 ? { borderColor: "red" } : null}
              />

              <input
                type="number"
                placeholder="Double Journey"
                name="double1"
                value={formik.values.double1}
                onChange={formik.handleChange}
                style={formik.errors.double1 ? { borderColor: "red" } : null}
              />
            </div>

            {/* group2 */}
            <div className="group">
              <select
                name="vechileType2"
                id="vechileType2"
                value={formik.values.vechileType2}
                onChange={formik.handleChange}
                style={
                  formik.errors.vechileType2 ? { borderColor: "red" } : null
                }
              >
                <option>Select vechile type</option>
                <option value="car/jeep/van">Car/Jeep/Van</option>
                <option value="lcv">LCV</option>
                <option value="truck/bus">Truck/Bus</option>
                <option value="heavy-vechile">Heavy Vechile</option>
              </select>

              <input
                type="number"
                placeholder="Single Journey"
                name="single2"
                value={formik.values.single2}
                onChange={formik.handleChange}
                style={formik.errors.single2 ? { borderColor: "red" } : null}
              />

              <input
                type="number"
                placeholder="Double Journey"
                name="double2"
                value={formik.values.double2}
                onChange={formik.handleChange}
                style={formik.errors.double2 ? { borderColor: "red" } : null}
              />
            </div>

            {/* group3 */}
            <div className="group">
              <select
                name="vechileType3"
                id="vechileType3"
                value={formik.values.vechileType3}
                onChange={formik.handleChange}
                style={
                  formik.errors.vechileType3 ? { borderColor: "red" } : null
                }
              >
                <option>Select vechile type</option>
                <option value="car/jeep/van">Car/Jeep/Van</option>
                <option value="lcv">LCV</option>
                <option value="truck/bus">Truck/Bus</option>
                <option value="heavy-vechile">Heavy Vechile</option>
              </select>

              <input
                type="number"
                placeholder="Single Journey"
                name="single3"
                value={formik.values.single3}
                onChange={formik.handleChange}
                style={formik.errors.single3 ? { borderColor: "red" } : null}
              />

              <input
                type="number"
                placeholder="Double Journey"
                name="double3"
                value={formik.values.double3}
                onChange={formik.handleChange}
                style={formik.errors.double3 ? { borderColor: "red" } : null}
              />
            </div>

            {/* group4 */}
            <div className="group">
              <select
                name="vechileType4"
                id="vechileType4"
                value={formik.values.vechileType4}
                onChange={formik.handleChange}
                style={
                  formik.errors.vechileType4 ? { borderColor: "red" } : null
                }
              >
                <option>Select vechile type</option>
                <option value="car/jeep/van">Car/Jeep/Van</option>
                <option value="lcv">LCV</option>
                <option value="truck/bus">Truck/Bus</option>
                <option value="heavy-vechile">Heavy Vechile</option>
              </select>

              <input
                type="number"
                placeholder="Single Journey"
                name="single4"
                value={formik.values.single4}
                onChange={formik.handleChange}
                style={formik.errors.single4 ? { borderColor: "red" } : null}
              />

              <input
                type="number"
                placeholder="Double Journey"
                name="double4"
                value={formik.values.double4}
                onChange={formik.handleChange}
                style={formik.errors.double4 ? { borderColor: "red" } : null}
              />
            </div>
          </div>
          <div className="btn-group">
            <button className="btn" type="submit">
              Add Details
            </button>
            <button
              className="btn"
              type="cancel"
              onClick={() => setNewToll(!newToll)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewTollBox;
