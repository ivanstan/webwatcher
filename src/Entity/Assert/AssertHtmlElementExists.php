<?php

namespace App\Entity\Assert;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="assert_html_element_exists")
 */
class AssertHtmlElementExists extends AbstractAssert
{
    public const TYPE = 'html_element_exists';

    public const SELECTOR_TYPE_CSS = 'css';
    public const SELECTOR_TYPE_XPATH = 'xpath';

    /**
     * @var string $selector
     * @ORM\Column(name="selector", type="string")
     */
    protected $selector = 'body';

    /**
     * @var string $selector
     * @ORM\Column(name="selector_type", type="string", columnDefinition="ENUM('xpath', 'css')")
     */
    protected $selectorType = self::SELECTOR_TYPE_CSS;

    public static function getSelectorTypes(): array
    {
        return [
            'CSS' => self::SELECTOR_TYPE_CSS,
            'XPath' => self::SELECTOR_TYPE_XPATH,
        ];
    }

    public function getSelector(): string
    {
        return $this->selector;
    }

    public function setSelector(string $selector): void
    {
        $this->selector = $selector;
    }

    public function getSelectorType(): string
    {
        return $this->selectorType;
    }

    public function setSelectorType(string $selectorType): void
    {
        $this->selectorType = $selectorType;
    }
}
