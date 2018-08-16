<?php

namespace App\Service\Snapshot;

use App\Entity\Authenticator\SeleniumAuthenticator;
use App\Entity\Resource\PageResource;
use App\Entity\PageSnapshot;
use App\Entity\Project;
use App\Service\BrowserMob\Proxy;
use App\Service\Factory\PageSnapshotFactory;
use App\Service\HttpArchive\HttpArchive;
use App\Service\Selenium\Engine;
use App\Service\Selenium\ScreenshotService;
use App\Service\Selenium\SeleniumAuthenticatorService;
use Facebook\WebDriver\Remote\RemoteWebDriver;

class PageSnapshotService implements SnapshotServiceInterface
{
    public const MAX_TIMEOUT_SEC = 10;

    private $factory;

    /** @var RemoteWebDriver */
    private $driver;
    /** @var Engine */
    private $engine;
    /** @var SeleniumAuthenticatorService */
    private $authenticator;
    /** @var Engine */
    private $seleniumService;

    /** @var Proxy */
    private $proxy;

    public function __construct(
        ScreenshotService $seleniumService,
        PageSnapshotFactory $factory,
        Engine $engine,
        SeleniumAuthenticatorService $authenticatorService
    ) {
        $this->factory = $factory;
        $this->engine = $engine;
        $this->authenticator = $authenticatorService;
        $this->seleniumService = $seleniumService;
    }

    public function getDriver(): RemoteWebDriver
    {
        return $this->driver;
    }

    public function setup(Project $project): self
    {
        $this->driver = $this->engine->getDriver();

        $this->proxy = $this->engine->getProxy();

        if ($project->getAuthenticator() && $project->getAuthenticator() instanceof SeleniumAuthenticator) {
            $this
                ->authenticator
                ->setDriver($this->driver)
                ->setup($project->getAuthenticator())
                ->authenticate($project->getAuthenticator())
            ;
        }

        $this->seleniumService->setDriver($this->driver);

        return $this;
    }

    /**
     * @param PageResource $page
     */
    public function snapshot($page): PageSnapshot
    {
        $snapshot = $this->factory->create($page);

        $this->proxy->setup('project-' . $page->getProject()->getId() . '-page-' . $page->getId());

        $this->driver->get($page->getUrl());

        $this->seleniumService->getScreenshot($snapshot);

        $har = $this->proxy->har();

        $snapshot->setHar(json_decode($har, true));

        $har = HttpArchive::fromString($har);
        $entry = $har->getEntry($page->getUrl());

        $snapshot->setResponseCode(0);

        if ($entry) {
            $snapshot->setResponseCode($entry['response']['status']);
            $snapshot->setHeaders($entry['response']['headers']);
        }

        return $snapshot;
    }
}
