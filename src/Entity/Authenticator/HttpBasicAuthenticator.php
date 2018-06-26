<?php

namespace App\Entity\Authenticator;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 */
class HttpBasicAuthenticator extends Authenticator
{
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

    public function getType(): string
    {
        return self::TYPE_HTTP_BASIC;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(?string $username): void
    {
        $this->username = $username;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(?string $password): void
    {
        $this->password = $password;
    }
}
