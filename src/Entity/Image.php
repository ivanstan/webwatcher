<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="image")
 */
class Image
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(type="string", nullable=true, name="name")
     */
    private $name;

    /**
     * @ORM\Column(type="string", nullable=false, name="path")
     */
    private $path;

    /**
     * @ORM\Column(type="json_array", nullable=true, name="tags")
     */
    private $tags;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\PageSnapshot", inversedBy="image", cascade={"remove"})
     * @ORM\JoinTable(
     *     name="http_snapshot_image",
     *     joinColumns={@ORM\JoinColumn(name="image_id", referencedColumnName="id", nullable=false)},
     *     inverseJoinColumns={@ORM\JoinColumn(name="snapshot_id", referencedColumnName="id", nullable=false)}
     * )
     */
    private $snapshot;
}
