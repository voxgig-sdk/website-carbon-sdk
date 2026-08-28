# frozen_string_literal: true

# Typed models for the WebsiteCarbon SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Data entity data model.
#
# @!attribute [rw] adjustedBytes
#   @return [Float]
#
# @!attribute [rw] co2
#   @return [Hash]
#
# @!attribute [rw] energy
#   @return [Float]
DataType = Struct.new(
  :adjustedBytes,
  :co2,
  :energy,
  keyword_init: true
)

# Request payload for Data#load.
#
# @!attribute [rw] byte
#   @return [Integer]
#
# @!attribute [rw] green
#   @return [Integer]
#
# @!attribute [rw] legacy
#   @return [Integer, nil]
DataLoadMatch = Struct.new(
  :byte,
  :green,
  :legacy,
  keyword_init: true
)

