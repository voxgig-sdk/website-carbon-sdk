-- Typed models for the WebsiteCarbon SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Data
---@field byte number
---@field cleaner_than number
---@field gco2e number
---@field green boolean
---@field rating string
---@field statistic table

---@class DataLoadMatch
---@field byte? number
---@field cleaner_than? number
---@field gco2e? number
---@field green? boolean
---@field rating? string
---@field statistic? table

local M = {}

return M
