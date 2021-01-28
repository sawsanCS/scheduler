import React from "react";
import "components/DayListItem.scss";
import "components/DayList";



import classNames from 'classnames';

export default function DayListItem(props) {
  const DayItemClass = classNames({
    'day-list__item': true,
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  })
  function formatSpots() {

    let spotMessage = ''
    if (props.spots === 0) {
      spotMessage = 'no spots remaining'
    }
    else if (props.spots === 1) {
      spotMessage = '1 spot remaining'
    } else {
      spotMessage = `${props.spots} spots remaining`

    }
    return spotMessage;
  }
  return (
    <li className={DayItemClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
