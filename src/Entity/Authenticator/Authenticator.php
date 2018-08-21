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
 *     SeleniumAuthenticator::TYPE = "App\Entity\Authenticator\SeleniumAuthenticator",
 *     HttpBasicAuthenticator::TYPE = "App\Entity\Authenticator\HttpBasicAuthenticator"
 * })
 */
abstract class Authenticator
{
    use Id;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Project", inversedBy="authenticator")
     * @ORM\JoinColumn(name="project_id", referencedColumnName="id")
     */
    protected $project;

    public static function getTypes(): array
    {
        return [
            SeleniumAuthenticator::TYPE => 'Login Form',
            HttpBasicAuthenticator::TYPE => 'Basic HTTP',
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
