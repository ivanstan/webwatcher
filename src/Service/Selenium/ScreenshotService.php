<?php

namespace App\Service\Selenium;

use App\Entity\PageSnapshot;
use App\Service\File\ImageFileManager;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\WebDriverDimension;
use Symfony\Component\Templating\EngineInterface;

class ScreenshotService
{
    private $cookies;

    /** @var RemoteWebDriver */
    private $driver;
    /** @var EngineInterface */
    private $template;
    /** @var ImageFileManager */
    private $manager;

    public function __construct(EngineInterface $template, ImageFileManager $manager)
    {
        $this->template = $template;
        $this->manager = $manager;
    }

    public function setDriver(RemoteWebDriver $driver)
    {
        $this->driver = $driver;
    }

    public function getScreenshot(?PageSnapshot $snapshot = null): ?string
    {
        $this->setWindowDimensions();

        $image = $this->driver->takeScreenshot();

        if ($snapshot) {
            $destination = $this->manager->getSnapshotImageDestination($snapshot, 'full-page');
            $imagePath = $this->manager->getSnapshotImagePath($snapshot, 'full-page');
            $this->manager->save($destination, $image);
            $snapshot->setImage($imagePath);
        }

        return $image;
    }

    private function setWindowDimensions(): void
    {
        $documentDimensions = $this->getDocumentDimensions();
        $windowDimensions = $this->driver->manage()->window()->getSize();

        if (isset($documentDimensions['height']) && $documentDimensions['height'] > $windowDimensions->getHeight()) {
            $this->driver->manage()->window()->setSize(
                new WebDriverDimension($windowDimensions->getWidth(), $documentDimensions['height'])
            );
        }
    }

    private function getDocumentDimensions(): array
    {
        $script = $this->template->render('selenium/dimensions.html.twig');
        return $this->driver->executeScript($script);
    }
}
