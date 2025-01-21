import { PdpProps } from './product';

export interface MeasuresProps {
  handleQtyChange: (qty: number) => void
  searchInventory: (eye: string) => void
  saleType: string
  setParentFields: () => void
  product: PdpProps
  minQty: number
  maxQty: number
}