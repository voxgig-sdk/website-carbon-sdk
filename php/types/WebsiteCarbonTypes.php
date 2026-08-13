<?php
declare(strict_types=1);

// Typed models for the WebsiteCarbon SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Data entity data model. */
class Data
{
    public float $adjustedBytes;
    public array $co2;
    public float $energy;
}

/** Request payload for Data#load. */
class DataLoadMatch
{
    public ?float $adjustedBytes = null;
    public ?array $co2 = null;
    public ?float $energy = null;
}

