# WebsiteCarbon SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "WebsiteCarbon",
            "slug": "website-carbon",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
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
            "name": "bytes",
            "title": "Bytes",
            "type": "`$NUMBER`",
            "req": True,
            "short": "Number of bytes you passed to the endpoint",
          },
          {
            "name": "cleanerThan",
            "title": "Cleaner Than",
            "type": "`$NUMBER`",
            "req": True,
            "short": "A numeric value between 0 and 1 representing the percentage of pages that this result's emissions are lower than.",
          },
          {
            "name": "gco2e",
            "title": "Gco2e",
            "type": "`$NUMBER`",
            "req": True,
            "short": "The emissions in grams of CO2 equivalent",
          },
          {
            "name": "green",
            "title": "Green",
            "type": "`$BOOLEAN`",
            "req": True,
            "short": "The green hosting flag you passed to the endpoint",
          },
          {
            "name": "rating",
            "title": "Rating",
            "type": "`$STRING`",
            "req": True,
            "short": "The Digital Carbon Rating",
          },
          {
            "name": "statistics",
            "title": "Statistics",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Statistics object containing detailed calculations.",
          },
        ],
        "name": "data",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/data",
                "segments": [
                  {
                    "lit": "data",
                  },
                ],
                "parts": [
                  "data",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "byte",
                      "orig": "bytes",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "reqd": True,
                      "example": 12345678,
                    },
                    {
                      "name": "green",
                      "orig": "green",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "reqd": True,
                      "example": 1,
                    },
                    {
                      "name": "legacy",
                      "orig": "legacy",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "byte",
                    "green",
                    "legacy",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
