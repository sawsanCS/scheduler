import React from "react";
import axios from 'axios'
import { render, act, cleanup, getByDisplayValue, waitForElement, prettyDOM, getByText, getAllByTestId, getByAltText, queryByAltText, getByPlaceholderText, queryByText, queryByDisplayValue} from "@testing-library/react";
import Application from "components/Application";
import { fireEvent } from '@testing-library/react/dist'
describe('Application', () => {
  afterEach(cleanup);

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'))

    const appointment = getAllByTestId(container, 'appointment')[0]

    fireEvent.click(getByAltText(appointment, 'Add'))

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' }
    })

    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'))
    fireEvent.click(getByText(appointment, 'Save'))

    expect(getByText(appointment, 'Saving')).toBeInTheDocument()

    await waitForElement(() => queryByText(appointment, 'Lydia Miller-Jones'))

    const day = getAllByTestId(container, 'day').find(day =>
      queryByText(day, 'Monday')
    )

    expect(getByText(day, 'no spots remaining')).toBeInTheDocument()
    
  });


  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container , debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
     await act(async ()  => {
      /* fire events that update state */
      fireEvent.click(queryByAltText(appointment, "Delete"));
    });
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();

    /* assert on the output */
    

  
    // 4. Check that the confirmation message is shown.
    
  
    // 5. Click the "Confirm" button on the confirmation.
    
  
    // 6. Check that the element with the text "Deleting" is displayed.
  
      fireEvent.click(getByText(appointment, "confirm"));
  
   

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
  
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
   
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    await waitForElement(() => getByText(day, "2 spots remaining"));
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    
  });
  











  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
   
   // 3. search for the appointment of Archie and Click the "Edit" button on the created appointment.
   const appointment = getAllByTestId(container, 'appointment').find(appointment => queryByText(appointment, 'Archie Cohen'))
  fireEvent.click(queryByAltText(appointment, 'Edit'))
  
    // 4. Check if you'll be redirected to Editing your appointment
    expect(getByPlaceholderText(appointment, /enter student name/i)).toBeInTheDocument()
    //.5 change the value of the student 
    fireEvent.change(getByDisplayValue(appointment, 'Archie Cohen'), {
      target: { value: ' SaoussenSlii' }
    })
    //.6  click the save button and expect Saving to be displayed
    fireEvent.click(getByText(appointment, 'Save'))
    await waitForElement(() => queryByText(appointment, 'Saoussen Slii'))

    const day = getAllByTestId(container, 'day').find(day =>
      queryByText(day, 'Monday')
    )

    expect(getByText(day, '1 spot remaining')).toBeInTheDocument()
  
  });



  it ("shows the save error when failing to save an appointment", async () => {
    const { container, getByDisplayValue } = render(<Application />)
    await waitForElement(() => getByText(container, 'Archie Cohen'))

    const appointment = getAllByTestId(container, 'appointment').find(
      appointment => queryByText(appointment, 'Archie Cohen')
    )
    fireEvent.click(queryByAltText(appointment, 'Edit'))

    fireEvent.change(getByDisplayValue('Archie Cohen'), {
      target: { value: 'Saoussen Slii' }
    })
    // mock error
    axios.put.mockRejectedValueOnce()
    fireEvent.click(getByText(appointment, 'Save'))
    expect(getByText(appointment, 'Saving')).toBeInTheDocument()

    await waitForElement(() => queryByText(appointment, 'Error'))
    fireEvent.click(queryByAltText(appointment, 'Close'))
    expect(queryByDisplayValue(appointment, 'Archie Cohen')).not.toBeInTheDocument()

  });

  it ("shows the delete error when failing to delete an existing appointment", async () => {
    const { container } = render(<Application />)
    await waitForElement(() => getByText(container, 'Archie Cohen'))
    const appointment = getAllByTestId(container, 'appointment').find(
      appointment => queryByText(appointment, 'Archie Cohen')
    )
    fireEvent.click(queryByAltText(appointment, 'Delete'))

    axios.delete.mockRejectedValueOnce()
    expect(getByText(appointment, 'Are you sure you would like to delete?')).toBeInTheDocument()

    fireEvent.click(getByText(appointment, 'confirm'))

    expect(getByText(appointment, 'Deleting')).toBeInTheDocument()

    await waitForElement(() => queryByText(appointment, 'Error'))
    fireEvent.click(queryByAltText(appointment, 'Close'))
    expect(queryByDisplayValue(appointment, 'Archie Cohen')).not.toBeInTheDocument()
  })
  
  


})
