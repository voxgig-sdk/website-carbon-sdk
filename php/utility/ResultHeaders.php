<?php
declare(strict_types=1);

// WebsiteCarbon SDK utility: result_headers

class WebsiteCarbonResultHeaders
{
    public static function call(WebsiteCarbonContext $ctx): ?WebsiteCarbonResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
