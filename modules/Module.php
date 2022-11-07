<?php
namespace modules;

use Craft;

/**
 * Custom module class.
 *
 * Learn about module development in Yii’s documentation...
 * http://www.yiiframework.com/doc-2.0/guide-structure-modules.html
 *
 * ...or start from Craft’s perspective:
 * https://craftcms.com/docs/4.x/extend/module-guide.html
 *
 * To initialize the module on every request, open config/app.php and uncomment:
 *
 *     'bootstrap' => ['my-module']
 */
class Module extends \yii\base\Module
{
    /**
     * Initializes the module.
     */
    public function init()
    {
        // Set a @modules alias pointed to the modules/ directory
        Craft::setAlias('@modules', __DIR__);

        // Set the controllerNamespace based on whether this is a console or web request
        if (Craft::$app->getRequest()->getIsConsoleRequest()) {
            $this->controllerNamespace = 'modules\\console\\controllers';
        } else {
            $this->controllerNamespace = 'modules\\controllers';
        }

        parent::init();

        // Custom initialization code goes here...
    }
}
