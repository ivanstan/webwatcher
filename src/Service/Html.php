<?php

namespace App\Service;

use App\Entity\Link;
use Symfony\Component\DomCrawler\Crawler;

class Html
{
    protected $html;
    protected $crawler;

    public function setHtml(string $html)
    {
        $this->html = $html;
        $this->crawler = new Crawler($html);
    }

    public static function removeMultipleSpaces(string $subject): string
    {
        $subject = preg_replace(['/\s{2,}/', '/[\t\n]/'], ' ', $subject);

        return trim(rtrim($subject));
    }

    public function getTitle(): ?string
    {
        if (!$this->crawler->filter('title')->count()) {
            return null;
        }

        $result = $this->crawler->filter('title')->text();

        return self::removeMultipleSpaces($result);
    }

    public function getMetaDescription(): ?string
    {
        if (!$this->crawler->filter("meta[name='description']")->count()) {
            return null;
        }

        $result = $this->crawler->filter("meta[name='description']")->attr('content');

        return self::removeMultipleSpaces($result);
    }

    public function getH1(): ?string
    {
        if (!$this->crawler->filter('h1')->count()) {
            return null;
        }

        $result = $this->crawler->filter('h1')->text();

        return self::removeMultipleSpaces($result);
    }

    public function getLanguage(): ?string
    {
        if (!$this->crawler->filter("html")->count() || !$this->crawler->filter("html")->attr('lang')) {
            return null;
        }

        $result = $this->crawler->filter("html")->attr('lang');

        return self::removeMultipleSpaces($result);
    }

    public function getMetaKeywords(): array
    {
        if (!$this->crawler->filter("meta[name='keywords']")->count()) {
            return [];
        }

        $keywords = $this->crawler->filter("meta[name='keywords']")->attr('content');
        $result = explode(',', $keywords);

        foreach ($result as $id => $keyword) {
            $result[$id] = strtolower(trim(rtrim($keyword)));
        }

        return $result;
    }

    public function getContent(): ?string
    {
        $html = preg_replace('/<style(.+?)<\/style>/si', '', $this->html);
        $html = preg_replace('/<script(.+?)<\/script>/si', '', $html);
        $crawler = new Crawler($html);

        if (!$crawler->filter('body')->count()) {
            return null;
        }

        $result = $crawler->filter('body')->text();

        return self::removeMultipleSpaces($result);
    }

    public function getLinks(): array
    {
        $result = [];
        foreach ($this->crawler->filter('a') as $node) {
            $url = $node->getAttribute('href');

            $type = Link::TYPE_LINK_EXTERNAL;
            if (parse_url($url, PHP_URL_HOST) === null) {
                $type = Link::TYPE_LINK_INTERNAL;
            }

            $result[$url] = $type;
        }

        foreach ($this->crawler->filter('img') as $node) {
            $url = $node->getAttribute('src');

            $result[$url] = Link::TYPE_LINK_IMAGE;
        }

        foreach ($this->crawler->filter('script') as $node) {
            $url = $node->getAttribute('src');

            $result[$url] = Link::TYPE_LINK_JAVASCRIPT;
        }

        foreach ($this->crawler->filter("link[rel='stylesheet']") as $node) {
            $url = $node->getAttribute('href');

            $result[$url] = Link::TYPE_LINK_STYLESHEET;
        }

        foreach ($this->crawler->filter("link[rel='icon']") as $node) {
            $url = $node->getAttribute('href');

            $result[$url] = Link::TYPE_LINK_RESOURCE;
        }

        return $result;
    }
}
