import React, { useState } from "react";
import "./styles.css";
import section from "./data/section.json";
import branch from "./data/branch.json";
import GoogleCaptcha from "./component/googleCaptcha";

function TextInput2({ type = "text", label, data, handleChange, name }) {
  return (
    <div className="input-container2">
      <input
        autoComplete="off"
        ariaAutocomplete="off"
        rez
        type={type}
        value={data}
        onChange={handleChange}
        name={name}
      />
      <label className={data && "filled"}>{label}</label>
    </div>
  );
}

export default function App() {
  const [data, setData] = useState({
    name: "",
    stdNum: "",
    year: "",
    sec: "",
    branch: "",
    email: "",
    phoneNum: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }
  return (
    <div className="App">
      <form autoComplete="off">
        <GoogleCaptcha />
        <input
          autocomplete="false"
          name="hidden"
          type="text"
          style={{ display: "none" }}
        />

        <TextInput2
          label="Name"
          handleChange={handleChange}
          data={data.name}
          name="name"
        />
        <TextInput2
          label="Student No."
          handleChange={handleChange}
          data={data.stdNum}
          name="stdNum"
        />
        <select
          className="dropdown"
          name="branch"
          onChange={handleChange}
          value={data.branch}
        >
          <option value="" hidden>
            Branch
          </option>
          {branch.branch.map((prop) => (
            <option key={prop} value={prop}>
              {prop}
            </option>
          ))}
        </select>

        <select
          className="dropdown"
          name="year"
          onChange={handleChange}
          value={data.year}
        >
          <option value="" hidden>
            Year
          </option>
          <option value="first">First</option>
          <option value="second">Second</option>
        </select>

        <select className="dropdown" name="sec" onChange={handleChange}>
          <option value="" hidden>
            Section
          </option>
          {data.year === "first"
            ? section.firstYear.map((prop) => (
                <option key={prop} value={prop}>
                  {prop}
                </option>
              ))
            : data.year === "second"
            ? section.secondYear.map((prop) => (
                <option key={prop} value={prop}>
                  {prop}
                </option>
              ))
            : null}
        </select>

        <TextInput2
          label="College Email"
          data={data.email}
          handleChange={handleChange}
          name="email"
        />
        <TextInput2 label="Whatsapp Number" />
      </form>
    </div>
  );
}
