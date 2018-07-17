<?php

namespace App\Service\Bulk;

use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;

class BulkPage
{
    public const SITEMAP_NAME = 'sitemap.xml';

    public function extract(string $url): array
    {
        $client = new Client(['verify' => false]);

        try {
            $response = $client->get($url);

            $mime = 'text/html';
            if ($response->hasHeader('Content-Type')) {
                $header = \GuzzleHttp\Psr7\parse_header($response->getHeader('Content-Type'));
                if (isset($header[0]) && isset($header[0][0])) {
                    $mime = $header[0][0];
                }
            }
        } catch (\Exception $exception) {
            return [];
        }

        $crawler = new Crawler($response->getBody()->getContents());
        $result = [];

        if ($mime === 'text/html') {
            foreach ($crawler->filter('a') as $url) {
                $result[] = $url->getAttribute('href');
            }
        }

        if ($mime === 'application/xml' || $mime === 'text/xml') {
            foreach ($crawler->filter('url loc') as $url) {
                $result[] = $url->textContent;
            }
        }

        return array_filter(array_unique($result));
    }
}
