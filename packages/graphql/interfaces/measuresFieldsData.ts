export interface SelectValues {
  id: string
  value: string
  parsedValue: number
}

export interface MeasuresFieldsData {
  field: string
  leftValues?: { positives: SelectValues[], negatives: SelectValues[] }
  rightValues?: { positives: SelectValues[], negatives: SelectValues[] }
  leftFieldOrder?: number
  rightFieldOrder?: number
}

export interface FieldsData {
  label: string
  name: string
}