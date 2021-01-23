import React, { useEffect } from "react";
import axios from 'axios';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Confirm from './Confirm';

import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";
export default function Appointment(props) {
  const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE ="CREATE"
const EDIT ="EDIT"
const CONFIRM ="CONFIRM"
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    //Make the request with the correct endpoint using the appointment id
    axios
      .put(`/api/appointments/${props.id}`, {
        interview
      })
      .then(response => {
        //When the response comes back we update the state using the existing setState.
        props.bookInterview(props.id, interview)
        //Transition to SHOW when the promise returned by props.bookInterview resolves
        transition(SHOW)
      })
      .catch(error => {
        console.log('error')
      })
  }
  }
    function onCancel() {

  }
  function confirm() {

  }
  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW)
    }
    if (props.interview === null && mode === SHOW) {
      transition(EMPTY)
    }
  }, [transition, mode, props.interview])
  return (
    <article className="appointment" >
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => {back() }}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={() => {back()}}
        />
      )}
     
    </article>
  )
}