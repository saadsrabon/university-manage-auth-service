import { SortOrder } from 'mongoose'

export type IpaginationOption = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: SortOrder
}
