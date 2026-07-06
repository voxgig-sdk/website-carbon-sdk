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
# @!attribute [rw] byte
#   @return [Float]
#
# @!attribute [rw] cleaner_than
#   @return [Float]
#
# @!attribute [rw] gco2e
#   @return [Float]
#
# @!attribute [rw] green
#   @return [Boolean]
#
# @!attribute [rw] rating
#   @return [String]
#
# @!attribute [rw] statistic
#   @return [Hash]
Data = Struct.new(
  :byte,
  :cleaner_than,
  :gco2e,
  :green,
  :rating,
  :statistic,
  keyword_init: true
)

# Request payload for Data#load.
#
# @!attribute [rw] byte
#   @return [Float, nil]
#
# @!attribute [rw] cleaner_than
#   @return [Float, nil]
#
# @!attribute [rw] gco2e
#   @return [Float, nil]
#
# @!attribute [rw] green
#   @return [Boolean, nil]
#
# @!attribute [rw] rating
#   @return [String, nil]
#
# @!attribute [rw] statistic
#   @return [Hash, nil]
DataLoadMatch = Struct.new(
  :byte,
  :cleaner_than,
  :gco2e,
  :green,
  :rating,
  :statistic,
  keyword_init: true
)

