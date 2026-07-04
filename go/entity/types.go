// Typed models for the WebsiteCarbon SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Data is the typed data model for the data entity.
type Data struct {
	Byte float64 `json:"byte"`
	CleanerThan float64 `json:"cleaner_than"`
	Gco2e float64 `json:"gco2e"`
	Green bool `json:"green"`
	Rating string `json:"rating"`
	Statistic map[string]any `json:"statistic"`
}

// DataLoadMatch mirrors the data fields as an all-optional match
// filter (Go analog of Partial<Data>).
type DataLoadMatch struct {
	Byte *float64 `json:"byte,omitempty"`
	CleanerThan *float64 `json:"cleaner_than,omitempty"`
	Gco2e *float64 `json:"gco2e,omitempty"`
	Green *bool `json:"green,omitempty"`
	Rating *string `json:"rating,omitempty"`
	Statistic *map[string]any `json:"statistic,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
