<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;

/**
 * @ORM\Entity()
 * @ORM\Table(name="user")
 */
class User extends BaseUser
{
    public const ROLE_ADMIN = 'ROLE_ADMIN';

    /**
     * @var int
     *
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(name="id", type="integer")
     */
    protected $id;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\UserPreference", cascade={"persist"})
     * @ORM\JoinColumn(name="preference_id", referencedColumnName="id")
     */
    protected $preference;

    public function getPreference(): ?UserPreference
    {
        return $this->preference;
    }

    public function setPreference(UserPreference $preference): void
    {
        $this->preference = $preference;
    }
}
