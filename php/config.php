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
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
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
              'title' => 'Adjusted Bytes',
              'type' => '`$NUMBER`',
              'req' => true,
              'short' => 'The data transfer of the page load adjusted to take returning visitor caching into account.',
            ],
            [
              'name' => 'co2',
              'title' => 'Co2',
              'type' => '`$OBJECT`',
              'req' => true,
              'short' => 'Object containing data relating to CO2 emissions from each page load.',
            ],
            [
              'name' => 'energy',
              'title' => 'Energy',
              'type' => '`$NUMBER`',
              'req' => true,
              'short' => 'The approximate amount of energy required for each page load in kWh',
            ],
          ],
          'name' => 'data',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/data',
                  'segments' => [
                    [
                      'lit' => 'data',
                    ],
                  ],
                  'parts' => [
                    'data',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.statistics`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'byte',
                        'orig' => 'byte',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 12345678,
                      ],
                      [
                        'name' => 'green',
                        'orig' => 'green',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 1,
                      ],
                      [
                        'name' => 'legacy',
                        'orig' => 'legacy',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'byte',
                      'green',
                      'legacy',
                    ],
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
