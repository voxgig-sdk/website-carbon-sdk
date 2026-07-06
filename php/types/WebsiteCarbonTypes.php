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
    public float $byte;
    public float $cleaner_than;
    public float $gco2e;
    public bool $green;
    public string $rating;
    public array $statistic;
}

/** Request payload for Data#load. */
class DataLoadMatch
{
    public ?float $byte = null;
    public ?float $cleaner_than = null;
    public ?float $gco2e = null;
    public ?bool $green = null;
    public ?string $rating = null;
    public ?array $statistic = null;
}

