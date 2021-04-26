export interface ITrainFormationCoach {
  coachClass: string
  /**
   * Percentage load.
   *
   * `0` if unknown
   */
  loading: number

  loadingSpecified: boolean

  number: string

  toilet: {
    status: 0 | 1 | 2

    value: 'None' | 'Standard' | 'Accessible' | 'Unknown'
  }
}
