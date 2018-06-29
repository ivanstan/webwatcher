<?php

namespace App\Entity\Assert;

use App\Entity\Page;
use App\Property\Id;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table("assert")
 * @ORM\InheritanceType("JOINED")
 * @ORM\DiscriminatorColumn(name="type", type="string")
 * @ORM\DiscriminatorMap({
 *     "Assert::TYPE_RESPONSE_CODE" = "App\Entity\Assert\ResponseCodeAssert",
 *     "Assert::TYPE_ELEMENT_EXISTS" = "App\Entity\Assert\ElementExistsAssert"
 * })
 */
abstract class Assert
{
    use Id;

    public const TYPE_RESPONSE_CODE = 'response_code';
    public const TYPE_ELEMENT_EXISTS = 'element_exists';

    /**
     * @var Page
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Page", inversedBy="asserts", cascade={"persist"})
     * @ORM\JoinColumn(name="page_id", referencedColumnName="id", onDelete="CASCADE", nullable=false)
     */
    protected $page;

    public static function getTypes(): array
    {
        return [
            self::TYPE_RESPONSE_CODE => 'Response Code',
            self::TYPE_ELEMENT_EXISTS => 'Element Exists',
        ];
    }

    public function getPage(): ?Page
    {
        return $this->page;
    }

    public function setPage(?Page $page): void
    {
        $this->page = $page;
    }

}
