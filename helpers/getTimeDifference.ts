import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export const getTimeDifference = (timeString: string): number => {
  const split = timeString.split(':')

  const now = dayjs().tz('Europe/London')
  const nowHours = now.get('hours')

  const hours = parseInt(split[0])
  const mins = parseInt(split[1])
  const input = now.clone().set('minutes', mins).set('hours', hours)

  const hoursDiff = hours - nowHours

  if (hoursDiff === -23) {
    input.add(1, 'day')
  }

  const minDiff = input.diff(now, 'minutes')

  return minDiff
}

/**
 * Displays "in X mins", or "now" if the difference is <= 1 minute.
 */
export const getTimeDifferenceText = (difference: number): string => {
  return difference > 1 ? `in ${difference} mins` : 'now'
}
