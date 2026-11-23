<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \CraftCms\Cms\Config\GeneralConfig
 * @link https://craftcms.com/docs/5.x/reference/config/general.html
 */

use CraftCms\Cms\Config\GeneralConfig;

return GeneralConfig::create()
    // Allow changes to settings that are stored in project config (disable in production)
    ->allowAdminChanges(env('ALLOW_ADMIN_CHANGES', true))
    // Allow updates and plugin installs from the control panel (disable in production)
    ->allowUpdates(env('ALLOW_UPDATES', true))
    // Ask search engines not to index the site (enable outside of production)
    ->disallowRobots(env('DISALLOW_ROBOTS', false))
    // Set the default week start day for date pickers (0 = Sunday, 1 = Monday, etc.)
    ->defaultWeekStartDay(1)
    // Preload Single entries as Twig variables
    ->preloadSingles()
    // Prevent user enumeration attacks
    ->preventUserEnumeration()
    // Prevent the front-end Login page
    ->loginPath(false)
    // Set the @webroot alias so the clear-caches command knows where to find CP resources
    ->aliases([
        '@webroot' => public_path(),
    ])
;
