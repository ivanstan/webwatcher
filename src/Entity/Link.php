<?php

namespace App\Entity;

use App\Property\Id;
use Doctrine\ORM\Mapping as ORM;
use Psr\Log\InvalidArgumentException;

/**
 * @ORM\Entity(repositoryClass="App\Repository\LinkRepository")
 * @ORM\Table("link")
 */
class Link
{
    use Id;

    public const TYPE_LINK_INTERNAL = 'link_internal';
    public const TYPE_LINK_EXTERNAL = 'link_external';
    public const TYPE_LINK_STYLESHEET = 'stylesheet';
    public const TYPE_LINK_JAVASCRIPT = 'javascript';
    public const TYPE_LINK_IMAGE = 'image';
    public const TYPE_LINK_RESOURCE = 'resource';

    public static $typeTitle = [
        self::TYPE_LINK_INTERNAL => 'Internal link',
        self::TYPE_LINK_EXTERNAL => 'External link',
        self::TYPE_LINK_STYLESHEET => 'Stylesheet',
        self::TYPE_LINK_JAVASCRIPT => 'Javascript',
        self::TYPE_LINK_IMAGE => 'Image',
        self::TYPE_LINK_RESOURCE => 'Resource',
    ];

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", nullable=false, columnDefinition="ENUM('link_internal', 'link_external', 'stylesheet', 'javascript', 'image', 'resource')")
     */
    protected $type;

    /**
     * @var string
     *
     * @ORM\Column(name="url", type="string", nullable=false)
     */
    protected $url;

    public static function getTypeTitle(string $type)
    {
        if (!isset(self::$typeTitle[$type])) {
            throw new InvalidArgumentException(sprintf('Unknown link type %s', $type));
        }

        return self::$typeTitle[$type];
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function setType(string $type): void
    {
        $this->type = $type;
    }

    public function getUrl(): string
    {
        return $this->url;
    }

    public function setUrl(string $url): void
    {
        $this->url = $url;
    }
}
