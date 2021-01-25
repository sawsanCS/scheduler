
export function selectUserByName(state, name) {
  const filteredNames = state.users.filter(user => user.name === name)
  return filteredNames
}
export function getInterview (state, interview){
  if (!interview) return null;
  return {interviewer: state.interviewers[interview.interviewer], student: interview.student};
}
export function getAppointmentsForDay(state, day) {
  const filteredAppointmentsForDay = []
  state.days.forEach(stateDay => {
    if (stateDay.name === day) {
      stateDay.appointments.forEach(appointmentId => {
        filteredAppointmentsForDay.push(state.appointments[appointmentId])
      })
    }
  })

  return filteredAppointmentsForDay
}

export function getInterviewersForDay(state, day) {
  const filteredInterviewers = []
  state.days.forEach(stateDay => {
    if (stateDay.name === day) {
      stateDay.interviewers.forEach(interviewerId => {
        filteredInterviewers.push(state.interviewers[interviewerId])
      })
    }
  })
  return filteredInterviewers
}