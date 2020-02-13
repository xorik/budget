import { Budget } from './budget'

export interface Interval {
  id: number
  title: string
  start: string
  end: string
  budget: Budget[]
}
