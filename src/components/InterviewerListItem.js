import React from 'react';
import "components/InterviewerListItem.scss";
import classNames from 'classnames';

export default function InterviewerListItem(props) {
  const InterviewerItemClass = classNames({
    'day-interviewers__item': true, 
    'interviewers__item--selected': props.selected
  })
  return (
    <li className = {InterviewerItemClass} onClick={() => props.setInterviewer(props.name)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
    </li>
  );
}
