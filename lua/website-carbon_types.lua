-- Typed models for the WebsiteCarbon SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Data
---@field adjustedBytes number
---@field co2 table
---@field energy number

---@class DataLoadMatch
---@field byte number
---@field green number
---@field legacy? number

local M = {}

return M
