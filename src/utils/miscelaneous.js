export const dateStrToDateObj = (dateStr) => {
  const [month, day, year] = dateStr.split('-')
  const date = new Date(+year, month - 1, +day)

  return date.toDateString()
}
