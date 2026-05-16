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
        "auth" => {
          "prefix" => "Bearer",
        },
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
              "name" => "byte",
              "req" => true,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "cleaner_than",
              "req" => true,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "gco2e",
              "req" => true,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "green",
              "req" => true,
              "type" => "`$BOOLEAN`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "rating",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 4,
            },
            {
              "name" => "statistic",
              "req" => true,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 5,
            },
          ],
          "name" => "data",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 12345678,
                        "kind" => "query",
                        "name" => "byte",
                        "orig" => "byte",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "green",
                        "orig" => "green",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "legacy",
                        "orig" => "legacy",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
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
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
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
