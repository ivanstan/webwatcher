<?php

namespace App\Service\Bulk;

use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;

class BulkPage
{
    public const SITEMAP_NAME = 'sitemap.xml';

    public function fromSiteMap(string $baseUrl)
    {
        $result = [];
        $crawler = $this->getCrawler($baseUrl . '/' . self::SITEMAP_NAME);

        if ($crawler) {
            foreach ($crawler->filter('url loc') as $url) {
                $result[] = parse_url($url->textContent, PHP_URL_PATH);
            }
        }

        return array_filter(array_unique($result));
    }

    public function crawl(string $baseUrl)
    {
        $result = [];
        $crawler = $this->getCrawler($baseUrl);

        if ($crawler) {
            foreach ($crawler->filter('a') as $url) {
                $result[] = parse_url($url->getAttribute('href'), PHP_URL_PATH);
            }
        }

        return array_filter(array_unique($result));
    }

    private function getCrawler(string $url): ?Crawler
    {
        $client = new Client(['verify' => false]);

        try {
            $response = $client->get($url);
        } catch (\Exception $exception) {
            return null;
        }

        return new Crawler($response->getBody()->getContents());
    }
}
