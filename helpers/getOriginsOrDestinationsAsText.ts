import type { ILocation } from '../models/Location'

export default (locations: ILocation[]) => {
  if (locations.length === 0) return '<No dest.>'

  return locations.reduce((prev, val, i) => {
    if (i === 0) {
      return val.locationName
    } else if (i === locations.length - 1) {
      return `${prev} and ${val.locationName}`
    } else {
      return `${prev}, ${val.locationName}`
    }
  }, '')
}
