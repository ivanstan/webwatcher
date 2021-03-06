<?php

namespace App\Property;

use Symfony\Component\Validator\Constraints as Assert;

trait Path
{
    /**
     * @var string
     *
     * @ORM\Column(name="path", type="string", nullable=false)
     * @Assert\NotBlank()
     */
    protected $path;

    public function getPath(): ?string
    {
        return $this->path;
    }

    public function setPath(?string $path)
    {
        $this->path = $path;
    }
}
