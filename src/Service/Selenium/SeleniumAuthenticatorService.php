<?php

namespace App\Service\Selenium;

use App\Entity\Authenticator\AuthenticatorInterface;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\WebDriverBy;

class SeleniumAuthenticatorService {

    /** @var RemoteWebDriver */
    private $driver;

    /**
     * @param \App\Entity\Authenticator\SeleniumAuthenticator $authenticator
     */
    public function setup(AuthenticatorInterface $authenticator): self
    {
        $this->driver->get($authenticator->getUrl());

        return $this;
    }

    /**
     * @param \App\Entity\Authenticator\SeleniumAuthenticator $authenticator
     */
    public function authenticate(AuthenticatorInterface $authenticator): self
    {
        $username = $this->driver->findElement(WebDriverBy::cssSelector($authenticator->getUsernameSelector()));
        $username->sendKeys($authenticator->getUsername());

        $password = $this->driver->findElement(WebDriverBy::cssSelector($authenticator->getPasswordSelector()));
        $password->sendKeys($authenticator->getPassword());

        $submit = $this->driver->findElement(WebDriverBy::cssSelector($authenticator->getSubmitSelector()));

        $submit->click();

        return $this;
    }

    public function setDriver(RemoteWebDriver $driver): self
    {
        $this->driver = $driver;

        return $this;
    }

    public function getScreenshot(): string
    {
        return $this->driver->takeScreenshot();
    }

    public function getCookies()
    {
        return $this->driver->manage()->getCookies();
    }
}
