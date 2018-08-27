<?php

namespace App\Service\Assert;

use App\Entity\Assert\AssertHtmlElementExists;
use App\Entity\PageSnapshot;
use Symfony\Component\DomCrawler\Crawler;

class AssertHtmlElementExistsService implements AssertServiceInterface
{
    /**
     * @param PageSnapshot $snapshot
     * @param AssertHtmlElementExists $assert
     * @return bool
     */
    public function assert($snapshot, $assert)
    {
        $crawler = new Crawler($snapshot->getBody());
        $elements = null;

        if ($assert->getSelectorType() === AssertHtmlElementExists::SELECTOR_TYPE_XPATH) {
            $elements = $crawler->filterXPath($assert->getSelector());
        } elseif ($assert->getSelectorType() === AssertHtmlElementExists::SELECTOR_TYPE_CSS) {
            $elements = $crawler->filter($assert->getSelector());
        }

        return count($elements) > 0;
    }

    /**
     * @param PageSnapshot $snapshot
     * @param AssertHtmlElementExists $assert
     * @return string
     */
    public function getComment(bool $result, $snapshot, $assert): string
    {
        if ($result) {
            return \sprintf(
                'Positive assertion that HTML element "%s" exists on the page using %s selector.',
                $assert->getSelector(),
                $assert->getSelectorType()
            );
        }

        return \sprintf(
            'Negative assertion that HTML element "%s" exists on the page using %s selector.',
            $snapshot->getStatus(),
            $assert->getSelectorType()
        );
    }

}
