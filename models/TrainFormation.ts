import type { ITrainFormationCoach } from './TrainFormationCoach'

export interface ITrainFormation {
  /**
   * Average percentage load across train.
   *
   * `0` if unknown
   */
  avgLoading: number

  avgLoadingSpecified: boolean

  coaches: ITrainFormationCoach[]
}
