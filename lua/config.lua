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
            ["name"] = "adjustedBytes",
            ["title"] = "Adjusted Bytes",
            ["type"] = "`$NUMBER`",
            ["req"] = true,
            ["short"] = "The data transfer of the page load adjusted to take returning visitor caching into account.",
          },
          {
            ["name"] = "co2",
            ["title"] = "Co2",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "Object containing data relating to CO2 emissions from each page load.",
          },
          {
            ["name"] = "energy",
            ["title"] = "Energy",
            ["type"] = "`$NUMBER`",
            ["req"] = true,
            ["short"] = "The approximate amount of energy required for each page load in kWh",
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
                  ["res"] = "`body.statistics`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "byte",
                      ["orig"] = "byte",
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
                    "legacy",
                  },
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
