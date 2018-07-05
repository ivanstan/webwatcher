<?php

namespace App\Entity\Authenticator;

use App\Entity\Project;
use App\Property\Id;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table("authenticator")
 * @ORM\InheritanceType("JOINED")
 * @ORM\DiscriminatorColumn(name="type", type="string")
 * @ORM\DiscriminatorMap({
 *     Authenticator::TYPE_SELENIUM = "App\Entity\Authenticator\SeleniumAuthenticator",
 *     Authenticator::TYPE_HTTP_BASIC = "App\Entity\Authenticator\HttpBasicAuthenticator"
 * })
 */
abstract class Authenticator
{
    use Id;

    const TYPE_SELENIUM = 'selenium';
    const TYPE_HTTP_BASIC = 'http';

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Project", inversedBy="authenticator")
     * @ORM\JoinColumn(name="project_id", referencedColumnName="id")
     */
    protected $project;

    public static function getTypes(): array
    {
        return [
            self::TYPE_SELENIUM => 'Simulated',
            self::TYPE_HTTP_BASIC => 'Basic HTTP',
        ];
    }

    public function getProject(): ?Project
    {
        return $this->project;
    }

    public function setProject(?Project $project): void
    {
        $this->project = $project;
    }
}
