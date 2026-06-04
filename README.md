# WebsiteCarbon SDK

Estimate the carbon emissions produced by a single page view of any URL

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Website Carbon API

[Website Carbon](https://www.websitecarbon.com/) runs a public HTTP API that estimates the carbon footprint of a web page. Given a URL, it performs a real-time test of the page and returns an estimate of the carbon emissions generated per page view, based on transferred bytes and assumptions about the energy mix used to deliver and render the page.

What you get from the API:

- A `GET /site?url={website_url}` endpoint that runs a fresh test against the supplied URL.
- A carbon estimate per page view derived from the measured page weight.

The API is served from `https://api.websitecarbon.com` and, per the freepublicapis.com listing, is reachable without an API key. Rate limits, CORS policy, and quotas are not documented on the catalogue page, so treat the service as best-effort and avoid hammering it from client-side code.

## Try it

**TypeScript**
```bash
npm install website-carbon
```

**Python**
```bash
pip install website-carbon-sdk
```

**PHP**
```bash
composer require voxgig/website-carbon-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/website-carbon-sdk/go
```

**Ruby**
```bash
gem install website-carbon-sdk
```

**Lua**
```bash
luarocks install website-carbon-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { WebsiteCarbonSDK } from 'website-carbon'

const client = new WebsiteCarbonSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o website-carbon-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "website-carbon": {
      "command": "/abs/path/to/website-carbon-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Data** | Carbon-estimate results for a tested URL, returned by `GET /site?url={website_url}`. | `/data` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from websitecarbon_sdk import WebsiteCarbonSDK

client = WebsiteCarbonSDK({})


# Load a specific data
data, err = client.Data(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'websitecarbon_sdk.php';

$client = new WebsiteCarbonSDK([]);


// Load a specific data
[$data, $err] = $client->Data(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/website-carbon-sdk/go"

client := sdk.NewWebsiteCarbonSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "WebsiteCarbon_sdk"

client = WebsiteCarbonSDK.new({})


# Load a specific data
data, err = client.Data(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("website-carbon_sdk")

local client = sdk.new({})


-- Load a specific data
local data, err = client:Data(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = WebsiteCarbonSDK.test()
const result = await client.Data().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = WebsiteCarbonSDK.test(None, None)
result, err = client.Data(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = WebsiteCarbonSDK::test(null, null);
[$result, $err] = $client->Data(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Data(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = WebsiteCarbonSDK.test(nil, nil)
result, err = client.Data(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Data(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Website Carbon API

- Upstream: [https://www.websitecarbon.com/](https://www.websitecarbon.com/)
- API docs: [https://www.websitecarbon.com/api/](https://www.websitecarbon.com/api/)

---

Generated from the Website Carbon API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
