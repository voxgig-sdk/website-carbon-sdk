<?php
declare(strict_types=1);

// WebsiteCarbon SDK utility: feature_add

class WebsiteCarbonFeatureAdd
{
    public static function call(WebsiteCarbonContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
