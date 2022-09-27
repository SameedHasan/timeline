import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const NewItem = ({ closeModal }) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [groups, setGroups] = useState(null);
  const [group_id, setGroup_id] = useState("");

  useEffect(() => {
    var config = {
      method: "get",
      url: "http://localhost:5000/getgroups",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setGroups(response.data);
        setGroup_id(response.data[0].id);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const start_time = moment(start).format();
    const end_time = moment(end).format();
    if (title.trim().length === 0) {
      alert("Please enter event title!");
    } else {
      // api call
      var config = {
        method: "post",
        url: "http://localhost:5000/insertitem",
        headers: {
          "Content-Type": "application/json",
        },
        data: { title, group_id, start_time, end_time },
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setTitle("");
          setGroup_id("");
          setEnd(new Date());
          setStart(new Date());
        })
        .catch(function (error) {
          console.log(error);
        });
      alert("Event added successfully!");
      closeModal();
    }
    // console.log({ title, group_id, start_time, end_time });
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Add New Event</h1>
      <hr />
      <div className="div">
        <form onSubmit={handleSubmit}>
          <label for="fname">Event Title</label>
          <input
            type="text"
            value={title}
            id="fname"
            name="firstname"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Please enter your event title here..."
          />
          <label for="fname">Event Start</label>
          <input
            type="datetime-local"
            value={start}
            id="fname"
            name="firstname"
            onChange={(e) => setStart(e.target.value)}
            placeholder="Please enter your event title here..."
          />
          <label for="fname">Event End</label>
          <input
            type="datetime-local"
            value={end}
            id="fname"
            name="firstname"
            onChange={(e) => setEnd(e.target.value)}
            placeholder="Please enter your event title here..."
          />
          <label for="country">Select Machine</label>
          <select
            id="country"
            name="country"
            value={group_id}
            onChange={(e) => setGroup_id(e.target.value)}
          >
            {groups !== null &&
              groups.map((g) => {
                return <option value={g.id}>{g.title}</option>;
              })}
          </select>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default NewItem;
