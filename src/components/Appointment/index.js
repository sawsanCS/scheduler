import React, { useEffect } from "react";

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';

import Confirm from './Confirm';

import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";
export default function Appointment(props) {

  const EMPTY = "EMPTY"
  const SHOW = "SHOW"
  const CREATE = "CREATE"
  const EDIT = "EDIT"
  const CONFIRM = "CONFIRM"
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const ERROR_SAVE = 'ERROR_SAVE'
  const ERROR_DELETE = 'ERROR_DELETE'

 
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function onCancel() {
    
    back();

  }
  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW)
    }
    if (props.interview === null && mode === SHOW) {
      transition(EMPTY)
    }

  }, [transition, mode, props.interview])
  
  //after creating a new appointment, save function will save it
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
  
    transition(SAVING)
    //Make the request with the correct endpoint using the appointment id
    props.bookInterview(props.id, interview)
      .then(response => {
        transition(SHOW)
      })
      .catch(error => {
        transition(ERROR_SAVE, true)
      })
  }


  function cancelAppointment() {
   transition(DELETING);

 props.cancelInterview(props.id)
      .then(response => {
        transition(EMPTY)
      })
      .catch(error => {
        transition(ERROR_DELETE, true)
      })
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW  && 
        <Show
        id = {props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      }
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={onCancel}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={onCancel}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Delete the appointment"
          onConfirm={cancelAppointment}
          onCancel={onCancel}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}


    </article>
  )
}

