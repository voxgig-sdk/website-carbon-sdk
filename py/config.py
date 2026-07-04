# WebsiteCarbon SDK configuration


def make_config():
    return {
        "main": {
            "name": "WebsiteCarbon",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.websitecarbon.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "data": {},
            },
        },
        "entity": {
      "data": {
        "fields": [
          {
            "active": True,
            "name": "byte",
            "req": True,
            "type": "`$NUMBER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "cleaner_than",
            "req": True,
            "type": "`$NUMBER`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "gco2e",
            "req": True,
            "type": "`$NUMBER`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "green",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "rating",
            "req": True,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "statistic",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 5,
          },
        ],
        "name": "data",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": 12345678,
                      "kind": "query",
                      "name": "byte",
                      "orig": "byte",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "example": 1,
                      "kind": "query",
                      "name": "green",
                      "orig": "green",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "legacy",
                      "orig": "legacy",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/data",
                "parts": [
                  "data",
                ],
                "select": {
                  "exist": [
                    "byte",
                    "green",
                    "legacy",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
