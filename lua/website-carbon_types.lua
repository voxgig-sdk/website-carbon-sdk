-- Typed models for the WebsiteCarbon SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Data
---@field bytes number
---@field cleanerThan number
---@field gco2e number
---@field green boolean
---@field rating string
---@field statistics table

---@class DataLoadMatch
---@field byte number
---@field green number
---@field legacy? number

local M = {}

return M
