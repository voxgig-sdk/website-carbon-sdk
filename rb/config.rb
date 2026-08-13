# WebsiteCarbon SDK configuration

module WebsiteCarbonConfig
  def self.make_config
    {
      "main" => {
        "name" => "WebsiteCarbon",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://api.websitecarbon.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "data" => {},
        },
      },
      "entity" => {
        "data" => {
          "fields" => [
            {
              "active" => true,
              "name" => "adjustedBytes",
              "req" => true,
              "type" => "`$NUMBER`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "co2",
              "req" => true,
              "type" => "`$OBJECT`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "energy",
              "req" => true,
              "type" => "`$NUMBER`",
              "index$" => 2,
            },
          ],
          "name" => "data",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => 12345678,
                        "kind" => "query",
                        "name" => "byte",
                        "orig" => "byte",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "example" => 1,
                        "kind" => "query",
                        "name" => "green",
                        "orig" => "green",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "legacy",
                        "orig" => "legacy",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/data",
                  "parts" => [
                    "data",
                  ],
                  "select" => {
                    "exist" => [
                      "byte",
                      "green",
                      "legacy",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.statistics`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    WebsiteCarbonFeatures.make_feature(name)
  end
end
