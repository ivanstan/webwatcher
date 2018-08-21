<?php

namespace App\Entity\Authenticator;

use App\Property\Path;
use App\Property\Protocol;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 * @ORM\Table("authenticator_selenium")
 */
class SeleniumAuthenticator extends AbstractAuthenticator implements AuthenticatorInterface
{
    public const TYPE = 'selenium';

    use Path;
    use Protocol;

    /**
     * @var string
     *
     * @ORM\Column(name="username", type="string", nullable=false)
     */
    protected $username;

    /**
     * @var string
     *
     * @ORM\Column(name="password", type="string", nullable=false)
     */
    protected $password;

    /**
     * @var string
     *
     * @ORM\Column(name="username_selector", type="string", nullable=false)
     */
    protected $usernameSelector;

    /**
     * @var string
     *
     * @ORM\Column(name="password_selector", type="string", nullable=false)
     */
    protected $passwordSelector;

    /**
     * @var string
     *
     * @ORM\Column(name="submit_selector", type="string", nullable=false)
     */
    protected $submitSelector;

    public function getType(): string
    {
        return self::TYPE;
    }

    public function getTitle(): string
    {
        $types = self::getTypes();

        return $types[$this->getType()];
    }

    public function getUrl(): string
    {
        $build = [
            'scheme' => $this->getProtocol(),
            'host' => $this->getProject()->getDomain(),
            'path' => $this->getPath(),
        ];

        return \GuzzleHttp\Psr7\Uri::fromParts($build);
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
