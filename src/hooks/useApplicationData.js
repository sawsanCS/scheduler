import { useState, useEffect } from "react";
import "components/Application.scss";
import axios from 'axios';

export default function useApplicationData(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  const setDay = (day) => setState((prev) => ({ ...prev, day }))
  const setDays = (days) => setState((prev) => ({ ...prev, days }))
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
      if (day.appointments.includes(id)) {
        const delta = add ? 1 : -1;

        const updatedDay = { ...day, spots: day.spots + delta }
        return updatedDay
      }
      return day
    })

    setDays(days)

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

    return axios
      .put(`/api/appointments/${id}`, { "interview": interview, "days": updateSpots(id, false) })
      .then(() => setState((state) => ({ ...state, appointments })))
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
      .delete(`/api/appointments/${id}`, { "days": updateSpots(id, true) })
      .then(() => setState((state) => ({ ...state, appointments })))
  }


  return {

    state,
    setDay,
    bookInterview,
    cancelInterview

  }

}