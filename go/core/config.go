package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "WebsiteCarbon",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"active": true,
						"name": "byte",
						"req": true,
						"type": "`$NUMBER`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "cleaner_than",
						"req": true,
						"type": "`$NUMBER`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "gco2e",
						"req": true,
						"type": "`$NUMBER`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "green",
						"req": true,
						"type": "`$BOOLEAN`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "rating",
						"req": true,
						"type": "`$STRING`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "statistic",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 5,
					},
				},
				"name": "data",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": 12345678,
											"kind": "query",
											"name": "byte",
											"orig": "byte",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"example": 1,
											"kind": "query",
											"name": "green",
											"orig": "green",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "legacy",
											"orig": "legacy",
											"reqd": false,
											"type": "`$INTEGER`",
										},
									},
								},
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
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
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
