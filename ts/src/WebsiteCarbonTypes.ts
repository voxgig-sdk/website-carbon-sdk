// Typed models for the WebsiteCarbon SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Data {
  byte: number
  cleaner_than: number
  gco2e: number
  green: boolean
  rating: string
  statistic: Record<string, any>
}

export interface DataLoadMatch {
  byte?: number
  cleaner_than?: number
  gco2e?: number
  green?: boolean
  rating?: string
  statistic?: Record<string, any>
}

