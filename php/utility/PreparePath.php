<?php
declare(strict_types=1);

// WebsiteCarbon SDK utility: prepare_path

class WebsiteCarbonPreparePath
{
    public static function call(WebsiteCarbonContext $ctx): string
    {
        $point = $ctx->point;
        $parts = [];
        if ($point) {
            $p = \Voxgig\Struct\Struct::getprop($point, 'parts');
            if (is_array($p)) {
                $parts = $p;
            }
        }
        return \Voxgig\Struct\Struct::join($parts, '/', true);
    }
}
