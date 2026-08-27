# WebsiteCarbon SDK configuration


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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "req": True,
            "short": "The data transfer of the page load adjusted to take returning visitor caching into account.",
            "type": "`$NUMBER`",
          },
          {
            "name": "co2",
            "req": True,
            "short": "Object containing data relating to CO2 emissions from each page load.",
            "type": "`$OBJECT`",
          },
          {
            "name": "energy",
            "req": True,
            "short": "The approximate amount of energy required for each page load in kWh",
            "type": "`$NUMBER`",
          },
        ],
        "name": "data",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 12345678,
                      "kind": "query",
                      "name": "byte",
                      "orig": "byte",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "green",
                      "orig": "green",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "legacy",
                      "orig": "legacy",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
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
                  "res": "`body.statistics`",
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
