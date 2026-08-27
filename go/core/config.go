package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "WebsiteCarbon",
			"slug": "website-carbon",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.websitecarbon.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"data": map[string]any{},
			},
		},
		"entity": map[string]any{
			"data": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "adjustedBytes",
						"req": true,
						"short": "The data transfer of the page load adjusted to take returning visitor caching into account.",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "co2",
						"req": true,
						"short": "Object containing data relating to CO2 emissions from each page load.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "energy",
						"req": true,
						"short": "The approximate amount of energy required for each page load in kWh",
						"type": "`$NUMBER`",
					},
				},
				"name": "data",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 12345678,
											"kind": "query",
											"name": "byte",
											"orig": "byte",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "green",
											"orig": "green",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "legacy",
											"orig": "legacy",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/data",
								"parts": []any{
									"data",
								},
								"select": map[string]any{
									"exist": []any{
										"byte",
										"green",
										"legacy",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.statistics`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
