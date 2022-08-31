export default function calculateAge(date) {
  const today = new Date()
  let age = today.getFullYear() - date.getFullYear()
  const monthDifference = today.getMonth() - date.getMonth()
  const birthdayMonthPassed = monthDifference < 0
  const birthdayDatePassed = monthDifference === 0 && today.getDate() < date.getDate()
  if (birthdayMonthPassed || birthdayDatePassed) {
    --age
  }
  return age
}