import dayjs from 'dayjs'

export const formatDate = (date) => dayjs(date).format('YYYY-MM-DD')

export const formatTime = (time) => dayjs(`1971-04-17 ${time}`)

export const formatTime2 = (time) =>
  dayjs(`1971-04-17 ${time}`).format('hh:mm A')

export const formatDateTimeToTime = (dateTime) =>
  dayjs(dateTime).format('hh:mm A')

export const formatDateTimeTo24Time = (dateTime) =>
  dayjs(dateTime).format('HH:mm')

export const formatDateTime = (dateTime) =>
  dayjs(dateTime).format('YYYY-MM-DD hh:mm A')

export function getDateRange(dateInput) {
  let startDate, endDate

  if (Array.isArray(dateInput)) {
    if (dateInput.length === 1) {
      startDate = endDate = dateInput[0]
    } else {
      startDate = dateInput[0]
      endDate = dateInput[dateInput.length - 1]
    }
  } else if (typeof dateInput === 'object' && dateInput !== null) {
    startDate = dateInput.start
    endDate = dateInput.end
  }

  // Convert to Date objects if they are not already
  startDate = formatDate(startDate)
  endDate = formatDate(endDate)

  // Return start and end dates
  return { startDate, endDate }
}
