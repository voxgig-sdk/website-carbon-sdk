<?php
declare(strict_types=1);

// WebsiteCarbon SDK utility: prepare_body

class WebsiteCarbonPrepareBody
{
    public static function call(WebsiteCarbonContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
