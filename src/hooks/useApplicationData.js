import { useState, useEffect } from "react";
import "components/Application.scss";
import axios from 'axios';

export default function useApplicationData(props) {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })
  const setDay = (day) => setState((prev) => ({ ...prev, day }))
  //using a hook to get days, appointments and interviewers from the API
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers')),

    ]).then(all => {
      const days = all[0].data
      const appointments = all[1].data
      const interviewers = all[2].data
      setState(prev => ({
        ...prev,
        days,
        appointments,
        interviewers
      }))
    })
  }, [])

  function updateSpots(id, add) {
    const days = state.days.map(day => {
      const updatedDay = { ...day }
      if (updatedDay.appointments.id)
        add ? day.spots++ : day.spots--
      return updatedDay
    })
    return days;
  }

  //updating the state appointment and appointments when an interview is booked
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    console.log(id, interview);
    return axios
      .put(`/api/appointments/${id}`, { "interview": interview, "days": updateSpots(id, 'TRUE') })
      .then(setState({ ...state, appointments }))
  }
  //updating the state appointment and appointments when an interview is cacelled
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id], interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios
      .delete(`/api/appointments/${id}`)
      .then(setState({ ...state, appointments, "days": updateSpots(id, 'FALSE') }))
  }


  return {

    state,
    setDay,
    bookInterview,
    cancelInterview

  }

}