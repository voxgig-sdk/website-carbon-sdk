<?php
declare(strict_types=1);

// WebsiteCarbon SDK base feature

class WebsiteCarbonBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(WebsiteCarbonContext $ctx, array $options): void {}
    public function PostConstruct(WebsiteCarbonContext $ctx): void {}
    public function PostConstructEntity(WebsiteCarbonContext $ctx): void {}
    public function SetData(WebsiteCarbonContext $ctx): void {}
    public function GetData(WebsiteCarbonContext $ctx): void {}
    public function GetMatch(WebsiteCarbonContext $ctx): void {}
    public function SetMatch(WebsiteCarbonContext $ctx): void {}
    public function PrePoint(WebsiteCarbonContext $ctx): void {}
    public function PreSpec(WebsiteCarbonContext $ctx): void {}
    public function PreRequest(WebsiteCarbonContext $ctx): void {}
    public function PreResponse(WebsiteCarbonContext $ctx): void {}
    public function PreResult(WebsiteCarbonContext $ctx): void {}
    public function PreDone(WebsiteCarbonContext $ctx): void {}
    public function PreUnexpected(WebsiteCarbonContext $ctx): void {}
}
