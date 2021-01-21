
function getAppointmentsForDay(state, day) {
  const filteredAppointmentsForDay = state.appointments.filter(appointment => appointment.day === day);
  return filteredAppointmentsForDay;
}
