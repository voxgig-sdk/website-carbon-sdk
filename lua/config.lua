-- WebsiteCarbon SDK configuration

local function make_config()
  return {
    main = {
      name = "WebsiteCarbon",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
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
            ["active"] = true,
            ["name"] = "adjustedBytes",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "co2",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "energy",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
            ["index$"] = 2,
          },
        },
        ["name"] = "data",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["example"] = 12345678,
                      ["kind"] = "query",
                      ["name"] = "byte",
                      ["orig"] = "byte",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "green",
                      ["orig"] = "green",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "legacy",
                      ["orig"] = "legacy",
                      ["reqd"] = false,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/data",
                ["parts"] = {
                  "data",
                },
                ["select"] = {
                  ["exist"] = {
                    "byte",
                    "green",
                    "legacy",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.statistics`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
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
