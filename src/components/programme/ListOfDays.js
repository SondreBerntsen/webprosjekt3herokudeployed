import React from 'react';

const listOfDays = (props) => {
  console.log(props)
  return (
    <div className="container horizontal_days row">
      {
        props.days.map(day => (
          <a className="programDayLink" key={day.date} href={"#"+day.date}><p className="horizontal_list_item">{day.day}</p></a>
        ))
      }
    </div>
  );
}

export default listOfDays;