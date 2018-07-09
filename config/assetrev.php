<?php
/**
 * Configuration for asset rev plugin
 *
 * @link https://github.com/clubstudioltd/craft3-asset-rev#configuration
 */
return array(
  '*' => array(
    'strategies' => [
      'manifest' => \club\assetrev\utilities\strategies\ManifestFileStrategy::class,
      'querystring' => \club\assetrev\utilities\strategies\QueryStringStrategy::class,
      'passthrough' => function ($filename, $config) {
          return $filename;
      },
    ],
    'pipeline' => 'manifest|querystring|passthrough',
    'manifestPath' => 'web/dist/rev-manifest.json',
    'assetsBasePath' => 'web/dist/',
    'assetUrlPrefix' => '/dist/'
  )
);
