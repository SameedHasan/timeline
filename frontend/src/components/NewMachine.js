import React, { useState } from "react";
import axios from "axios";

const NewMachine = ({ closeModal }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    var config = {
      method: "post",
      url: "http://localhost:5000/insertgroup",
      headers: {
        "Content-Type": "application/json",
      },
      data: { title },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setTitle("");
      })
      .catch(function (error) {
        console.log(error);
      });
    alert("Machine added successfully!");
    closeModal();
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Add New Machine</h1>
      <hr />
      <div className="div">
        <form onSubmit={handleSubmit}>
          <label for="fname">Machine Name</label>
          <input
            type="text"
            value={title}
            id="fname"
            name="firstname"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Please enter your machine name here..."
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default NewMachine;
