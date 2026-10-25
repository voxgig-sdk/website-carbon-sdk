# WebsiteCarbon SDK configuration

module WebsiteCarbonConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "WebsiteCarbon",
        "slug" => "website-carbon",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "now" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
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
              "name" => "bytes",
              "title" => "Bytes",
              "type" => "`$NUMBER`",
              "req" => true,
              "short" => "Number of bytes you passed to the endpoint",
            },
            {
              "name" => "cleanerThan",
              "title" => "Cleaner Than",
              "type" => "`$NUMBER`",
              "req" => true,
              "short" => "A numeric value between 0 and 1 representing the percentage of pages that this result's emissions are lower than.",
            },
            {
              "name" => "gco2e",
              "title" => "Gco2e",
              "type" => "`$NUMBER`",
              "req" => true,
              "short" => "The emissions in grams of CO2 equivalent",
            },
            {
              "name" => "green",
              "title" => "Green",
              "type" => "`$BOOLEAN`",
              "req" => true,
              "short" => "The green hosting flag you passed to the endpoint",
            },
            {
              "name" => "rating",
              "title" => "Rating",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "The Digital Carbon Rating",
            },
            {
              "name" => "statistics",
              "title" => "Statistics",
              "type" => "`$OBJECT`",
              "req" => true,
              "short" => "Statistics object containing detailed calculations.",
            },
          ],
          "name" => "data",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/data",
                  "segments" => [
                    {
                      "lit" => "data",
                    },
                  ],
                  "parts" => [
                    "data",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "byte",
                        "orig" => "bytes",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => 12345678,
                      },
                      {
                        "name" => "green",
                        "orig" => "green",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => 1,
                        "field" => true,
                      },
                      {
                        "name" => "legacy",
                        "orig" => "legacy",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "byte",
                      "green",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
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
