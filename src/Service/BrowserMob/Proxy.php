<?php

namespace App\Service\BrowserMob;

use GuzzleHttp\Client;

class Proxy
{
    private $port;

    /** @var Client */
    private $client;

    public static function create($url, $port)
    {
        $proxy = new self();
        $client = new Client([
            'base_uri' => $url,
            'timeout' => 4.0,
        ]);

        $proxy->setClient($client);
        $proxy->setPort($port);

        return $proxy;
    }

    public function getPort(): int
    {
        return $this->port;
    }

    public function setPort(int $port): void
    {
        $this->port = $port;
    }

    public function getClient(): Client
    {
        return $this->client;
    }

    public function setClient(Client $client): void
    {
        $this->client = $client;
    }

    public function getUrl(): string
    {
        $url = $this->client->getConfig()['base_uri'];

        $schema = parse_url($url, PHP_URL_SCHEME);
        $host = parse_url($url, PHP_URL_HOST);

        return $schema . '://' . $host . ':' . $this->port;
    }

    public function setReference(string $reference)
    {
        $response = $this->client->put('/proxy', [
            'form_params' => [
                'pageRef' => $reference,
            ]
        ]);

        $response->getBody()->getContents();
    }

    public function setup(string $reference)
    {
        $response = $this->client->put("/proxy/{$this->port}/har", [
            'form_params' => [
                'captureHeaders' => 'true',
                'captureCookies' => 'true',
                'captureContent' => 'true',
                'captureBinaryContent' => 'false',
                'initialPageRef' => $reference,
            ]
        ]);

        $body = $response->getBody()->getContents();

        return json_decode($body, true);
    }

    public function har()
    {
        $response = $this->client->get("/proxy/{$this->port}/har")->getBody()->getContents();

        return $response;
    }

}
