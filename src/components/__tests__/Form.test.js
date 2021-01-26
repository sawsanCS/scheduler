import React from "react";

import { render, cleanup } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import Form from "components/Appointment/Form";
import { checkPropTypes } from "prop-types";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(<Form interviewers={interviewers}/>); 
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByPlaceholderText } = render(<Form interviewers={interviewers} name ="Lydia Miller-Jones"/>); 

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("Lydia Miller-Jones");
  });



  it("validates that the student name is not blank", () => {
    /* 1. validation is shown */
    const onSave = jest.fn();

    const { getByText} = render ( <Form interviewers={interviewers} name="" onSave={onSave}/>)
    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    /* 2. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });
  
  xit("calls onSave function when the name is defined", () => {
    const onSave = jest.fn()

    /* 3. validation is not shown */
    const { queryByText, getByText } = render (<Form interviewers={interviewers} interviewer ={null}
       name="Lydia Miller-Jones"
       onSave={onSave} />)
       fireEvent.click(getByText("Save"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    /* 4. onSave is called once*/

    expect(onSave).toHaveBeenCalledTimes(1);
  
    /* 5. onSave is called with the correct arguments */
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });
  it("submits the name entered by the user", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
  
    const input = getByPlaceholderText("Enter Student Name");
  
    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
    fireEvent.click(getByText("Save"));
  
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });
  
  
});
