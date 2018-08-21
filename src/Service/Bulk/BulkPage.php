<?php

namespace App\Service\Bulk;

use Facebook\WebDriver\Cookie;
use GuzzleHttp\Client;
use GuzzleHttp\Cookie\CookieJar;
use GuzzleHttp\Exception\ConnectException;
use Symfony\Component\DomCrawler\Crawler;

class BulkPage
{
    public const SITEMAP_NAME = 'sitemap.xml';

    private $cookies;

    public function setCookies($cookies)
    {
        $this->cookies = $cookies;
    }

    public function extract(string $url): array
    {
        $client = new Client(['verify' => false]);

        $params = [];
        if ($this->cookies) {
            $domain = '.';
            $cookieArray = [];
            /** @var Cookie $cookie */
            foreach ($this->cookies as $cookie) {
                $cookieArray[$cookie->getName()] = $cookie->getValue();
                $domain = $cookie->getDomain();
            }

            $params['cookies'] = CookieJar::fromArray($cookieArray, $domain);
        }

        try {
            $response = $client->request('GET', $url, $params);

            $mime = 'text/html';
            if ($response->hasHeader('Content-Type')) {
                $header = \GuzzleHttp\Psr7\parse_header($response->getHeader('Content-Type'));
                if (isset($header[0]) && isset($header[0][0])) {
                    $mime = $header[0][0];
                }
            }
        } catch (ConnectException $exception) {
            throw new \Exception($exception->getHandlerContext()['error']);
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
