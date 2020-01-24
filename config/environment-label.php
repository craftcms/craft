<?php
/**
 * Environment Label Plugin Configuration
 *
 * See https://github.com/TopShelfCraft/Environment-Label
 */

return [
    'showLabel' => getenv('CRAFT_ENV_SHOW_LABEL', false),
    'labelText' => getenv('CRAFT_ENV_LABEL_TEXT'),
    'labelColor' => getenv('CRAFT_ENV_LABEL_COLOR', '#ff8c6e'),
    'textColor' => getenv('CRAFT_ENV_TEXT_COLOR', '#ffffff'),
    'prefixText' => null,
    'suffixText' => null,
];

?>
