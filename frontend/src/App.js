import React, { useState, useEffect } from "react";
import Timeline from "react-calendar-timeline";
// make sure you include the timeline stylesheet or the timeline will not be styled
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import axios from "axios";
import ModalPopup from "./components/Modal";

let keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group_id",
  itemTimeStartKey: "start_time",
  itemTimeEndKey: "end_time",
  groupLabelKey: "title",
};

const groupsArray = [
  { id: 1, title: "Machine 1" },
  { id: 2, title: "Machine 2" },
  { id: 3, title: "Machine 3" },
  { id: 4, title: "Machine 4" },
  { id: 5, title: "Machine 5" },
  { id: 6, title: "Machine 6" },
  { id: 7, title: "Machine 7" },
  { id: 8, title: "Machine 8" },
  { id: 9, title: "Machine 9" },
  { id: 10, title: "Machine 10" },
];

const itemsArray = [
  {
    id: 1,
    group: 1,
    title: "item 1",
    start_time: moment(Date.parse("2022-09-26T11:36:42.955Z")),
    end_time: moment(Date.parse("2022-09-26T11:36:42.955Z")).add(1, "months"),
  },
  {
    id: 2,
    group: 1,
    title: "item 2",
    start_time: moment().add(-0.5, "months"),
    end_time: moment().add(0.5, "months"),
  },
  {
    id: 3,
    group: 1,
    title: "item 3",
    start_time: moment().add(2, "months"),
    end_time: moment().add(3, "months"),
  },
];

const App = () => {
  const [items, setItems] = useState(itemsArray);
  const [groups, setGroups] = useState(groupsArray);
  const [visibility, setVisibility] = useState(false);
  const [machine, setMachine] = useState(true);

  useEffect(() => {
    // groups
    axios
      .get("http://localhost:5000/getgroups")
      .then(function ({ data }) {
        console.log(data);
        setGroups(data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // items
    axios
      .get("http://localhost:5000/getitems")
      .then(function ({ data }) {
        const events = data.map((d) => {
          d.start_time = moment(Date.parse(d.start_time));
          d.end_time = moment(Date.parse(d.end_time));
          return d;
        });
        console.log(data);
        console.log(events, "e");
        setItems(events);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [visibility]);

  const handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const group = groups[newGroupOrder];
    console.log(group);
    const updatedItems = items.map((item) =>
      item.id === itemId
        ? Object.assign({}, item, {
            start_time: moment(dragTime),
            end_time: moment(dragTime + (item.end_time - item.start_time)),
            group_id: group.id,
          })
        : item
    );
    setItems(updatedItems);
    const update = updatedItems.filter((i) => {
      return i.id === itemId;
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .put(`http://localhost:5000/updateitem/${itemId}`, update, config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("Moved", itemId, dragTime, newGroupOrder);
    console.log("items", updatedItems);
    console.log("u", update);
  };

  const handleItemResize = (itemId, time, edge) => {
    const updatedItems = items.map((item) =>
      item.id === itemId
        ? Object.assign({}, item, {
            start_time: edge === "left" ? moment(time) : item.start_time,
            end_time: edge === "left" ? item.end_time : moment(time),
          })
        : item
    );
    setItems(updatedItems);
    const update = updatedItems.filter((i) => {
      return i.id === itemId;
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .put(`http://localhost:5000/updateitem/${itemId}`, update, config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("Resized", itemId, time, edge);
    console.log("resized items", updatedItems);
  };

  const handleNewMachine = () => {
    setMachine(true);
    setVisibility(true);
  };
  const handleNewEvent = () => {
    setMachine(false);
    setVisibility(true);
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "5px",
        }}
      >
        <button className="btn" onClick={handleNewMachine}>
          Add Machine
        </button>
        <button className="btn" onClick={handleNewEvent}>
          Add Event
        </button>
      </div>
      <Timeline
        groups={groups}
        items={items}
        keys={keys}
        fullUpdate
        stackItems
        itemHeightRatio={0.75}
        canMove={true}
        canResize={"both"}
        defaultTimeStart={moment().add(-5, "months")}
        defaultTimeEnd={moment().add(5, "months")}
        itemTouchSendsClick={false}
        onItemMove={handleItemMove}
        onItemResize={handleItemResize}
      />
      <ModalPopup
        visibility={visibility}
        setVisibility={setVisibility}
        machine={machine}
      />
    </div>
  );
};

export default App;
