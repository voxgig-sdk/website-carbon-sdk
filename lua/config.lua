-- WebsiteCarbon SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "WebsiteCarbon",
      slug = "website-carbon",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["now"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://api.websitecarbon.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["data"] = {},
      },
    },
    entity = {
      ["data"] = {
        ["fields"] = {
          {
            ["name"] = "bytes",
            ["title"] = "Bytes",
            ["type"] = "`$NUMBER`",
            ["req"] = true,
            ["short"] = "Number of bytes you passed to the endpoint",
          },
          {
            ["name"] = "cleanerThan",
            ["title"] = "Cleaner Than",
            ["type"] = "`$NUMBER`",
            ["req"] = true,
            ["short"] = "A numeric value between 0 and 1 representing the percentage of pages that this result's emissions are lower than.",
          },
          {
            ["name"] = "gco2e",
            ["title"] = "Gco2e",
            ["type"] = "`$NUMBER`",
            ["req"] = true,
            ["short"] = "The emissions in grams of CO2 equivalent",
          },
          {
            ["name"] = "green",
            ["title"] = "Green",
            ["type"] = "`$BOOLEAN`",
            ["req"] = true,
            ["short"] = "The green hosting flag you passed to the endpoint",
          },
          {
            ["name"] = "rating",
            ["title"] = "Rating",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The Digital Carbon Rating",
          },
          {
            ["name"] = "statistics",
            ["title"] = "Statistics",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "Statistics object containing detailed calculations.",
          },
        },
        ["name"] = "data",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/data",
                ["segments"] = {
                  {
                    ["lit"] = "data",
                  },
                },
                ["parts"] = {
                  "data",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "byte",
                      ["orig"] = "bytes",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = 12345678,
                    },
                    {
                      ["name"] = "green",
                      ["orig"] = "green",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = 1,
                      ["field"] = true,
                    },
                    {
                      ["name"] = "legacy",
                      ["orig"] = "legacy",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "byte",
                    "green",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
