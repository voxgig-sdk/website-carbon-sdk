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
              "name" => "adjustedBytes",
              "req" => true,
              "type" => "`$NUMBER`",
            },
            {
              "name" => "co2",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "energy",
              "req" => true,
              "type" => "`$NUMBER`",
            },
          ],
          "name" => "data",
          "op" => {
            "load" => {
              "input" => "data",
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
                      },
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "green",
                        "orig" => "green",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "legacy",
                        "orig" => "legacy",
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
