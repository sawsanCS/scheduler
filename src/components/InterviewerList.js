import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "./InterviewerList.scss";


export default function InterviewerList(props) {
  const interviewersContent = props.interviewers.map(interviewer => (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer ={(event) => props.setInterviewer(interviewer.id)}
       />
  ))
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersContent}</ul>
    </section>
  );
}
