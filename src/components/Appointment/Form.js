import React, { useState } from 'react';
import InterviewerList from '../InterviewerList'
import Button from '../Button';

export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [errorMessage, setErrorMessage] = useState(null);
  function validateInput() {
    if (name.trim() === "") {
      setErrorMessage("Student name cannot be blank")
    }
    else {
      if (typeof interviewer !== "number") {
        setErrorMessage("Please select an interviewer")
      }
      else {
        setErrorMessage(null)
      }
      
      props.onSave(name, interviewer)
    
    }
  }


function cancel () {
  props.onCancel()
  setName("")
  setInterviewer("")
  setErrorMessage("")
}


return (<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={(event) => { event.preventDefault() }}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        data-testid="student-name-input"
        placeholder="Enter Student Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
    </form>
    <section className="appointment__validation">{errorMessage}</section>

    <InterviewerList interviewers={props.interviewers}
      interviewer={interviewer}
      onChange={setInterviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={() => cancel()}>Cancel</Button>

      <Button confirm onClick={() => validateInput()} >Save</Button>
    </section>
  </section>
</main>

)
}
