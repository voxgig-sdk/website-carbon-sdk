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
            "name": "adjustedBytes",
            "title": "Adjusted Bytes",
            "type": "`$NUMBER`",
            "req": True,
            "short": "The data transfer of the page load adjusted to take returning visitor caching into account.",
          },
          {
            "name": "co2",
            "title": "Co2",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Object containing data relating to CO2 emissions from each page load.",
          },
          {
            "name": "energy",
            "title": "Energy",
            "type": "`$NUMBER`",
            "req": True,
            "short": "The approximate amount of energy required for each page load in kWh",
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
                  "res": "`body.statistics`",
                },
                "args": {
                  "query": [
                    {
                      "name": "byte",
                      "orig": "byte",
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
