import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "./InterviewerList.scss";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  const interviewersContent = props.interviewers.map(interviewer => (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={props.setInterviewer}
    />
  ))
 
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersContent}</ul>
    </section>
  );
}
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

