import { SelectValues } from "./measuresFieldsData"

export interface CustomSelectProps {
  name: string
  eye: string
  from?: string
  nextMeasure: (x1: string, x2: string) => void
  negativeValues: SelectValues[] | undefined
  positiveValues: SelectValues[] | undefined
  disabled?: boolean
}