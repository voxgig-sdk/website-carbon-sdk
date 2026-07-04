# Typed models for the WebsiteCarbon SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Data:
    byte: float
    cleaner_than: float
    gco2e: float
    green: bool
    rating: str
    statistic: dict


@dataclass
class DataLoadMatch:
    byte: Optional[float] = None
    cleaner_than: Optional[float] = None
    gco2e: Optional[float] = None
    green: Optional[bool] = None
    rating: Optional[str] = None
    statistic: Optional[dict] = None

