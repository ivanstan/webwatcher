<?php

namespace App\Entity\Authenticator;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 */
class SeleniumAuthenticator extends Authenticator
{
    /**
     * @var string
     *
     * @ORM\Column(name="url", type="string", nullable=false)
     */
    private $url;

    /**
     * @var string
     *
     * @ORM\Column(name="username", type="string", nullable=false)
     */
    private $username;

    /**
     * @var string
     *
     * @ORM\Column(name="password", type="string", nullable=false)
     */
    private $password;

    /**
     * @var string
     *
     * @ORM\Column(name="username_selector", type="string", nullable=false)
     */
    private $usernameSelector;

    /**
     * @var string
     *
     * @ORM\Column(name="password_selector", type="string", nullable=false)
     */
    private $passwordSelector;

    /**
     * @var string
     *
     * @ORM\Column(name="submit_selector", type="string", nullable=false)
     */
    private $submitSelector;

    public function getType(): string
    {
        return self::TYPE_SELENIUM;
    }

    public function getUrl(): string
    {
        return $this->url;
    }

    public function setUrl(string $url): void
    {
        $this->url = $url;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): void
    {
        $this->username = $username;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): void
    {
        $this->password = $password;
    }

    public function getUsernameSelector(): ?string
    {
        return $this->usernameSelector;
    }

    public function setUsernameSelector(string $usernameSelector): void
    {
        $this->usernameSelector = $usernameSelector;
    }

    public function getPasswordSelector(): ?string
    {
        return $this->passwordSelector;
    }

    public function setPasswordSelector(string $passwordSelector): void
    {
        $this->passwordSelector = $passwordSelector;
    }

    public function getSubmitSelector(): ?string
    {
        return $this->submitSelector;
    }

    public function setSubmitSelector(string $submitSelector): void
    {
        $this->submitSelector = $submitSelector;
    }
}
