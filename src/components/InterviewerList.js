import React from "react";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const InterviewerListContent = props.interviewers.map(interviewer => (
    <InterviewerListItem
    key = {interviewer.id}
    name = {interviewer.name}
    avatar = {interviewer.avatar}
    selected = {interviewer.id === props.value}
    setInterviewer = {event => props.onChange(interviewer.id)}    />
  ))
  return (<ul>
    {InterviewerListContent}
  </ul>);

}
