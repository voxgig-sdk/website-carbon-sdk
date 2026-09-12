<?php
declare(strict_types=1);

// WebsiteCarbon SDK configuration

class WebsiteCarbonConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "WebsiteCarbon",
                "slug" => "website-carbon",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://api.websitecarbon.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "data" => [],
                ],
            ],
            "entity" => [
        'data' => [
          'fields' => [
            [
              'name' => 'adjustedBytes',
              'req' => true,
              'short' => 'The data transfer of the page load adjusted to take returning visitor caching into account.',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'co2',
              'req' => true,
              'short' => 'Object containing data relating to CO2 emissions from each page load.',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'energy',
              'req' => true,
              'short' => 'The approximate amount of energy required for each page load in kWh',
              'type' => '`$NUMBER`',
            ],
          ],
          'name' => 'data',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 12345678,
                        'kind' => 'query',
                        'name' => 'byte',
                        'orig' => 'byte',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'green',
                        'orig' => 'green',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'legacy',
                        'orig' => 'legacy',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/data',
                  'segments' => [
                    [
                      'lit' => 'data',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'byte',
                      'green',
                      'legacy',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.statistics`',
                  ],
                  'parts' => [
                    'data',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return WebsiteCarbonFeatures::make_feature($name);
    }
}
