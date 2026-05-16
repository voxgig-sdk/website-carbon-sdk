<?php
declare(strict_types=1);

// WebsiteCarbon SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class WebsiteCarbonMakeContext
{
    public static function call(array $ctxmap, ?WebsiteCarbonContext $basectx): WebsiteCarbonContext
    {
        return new WebsiteCarbonContext($ctxmap, $basectx);
    }
}
