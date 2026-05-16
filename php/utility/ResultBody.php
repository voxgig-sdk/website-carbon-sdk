<?php
declare(strict_types=1);

// WebsiteCarbon SDK utility: result_body

class WebsiteCarbonResultBody
{
    public static function call(WebsiteCarbonContext $ctx): ?WebsiteCarbonResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
