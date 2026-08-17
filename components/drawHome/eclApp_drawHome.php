<?php

class eclApp_drawHome extends eclApp
{
    static $name = '-home';
    static $content = 'drawHome_main';

    static function constructorHelper(eclEngine_application $me): void
    {
        $me->path = $me->parent->path;
    }
}
