<?php

namespace App\Entity\Authenticator;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 * @ORM\Table("authenticator_http_basic")
 */
class HttpBasicAuthenticator extends Authenticator implements AuthenticatorInterface
{
    public const TYPE = 'selenium';

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

    public function getType(): string
    {
        return self::TYPE;
    }

    public function getTitle(): string
    {
        $types = self::getTypes();

        return $types[$this->getType()];
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
