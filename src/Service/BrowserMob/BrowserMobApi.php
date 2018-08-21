<?php

namespace App\Service\BrowserMob;

use GuzzleHttp\Client;

class BrowserMobApi
{
    public const RANGE_DELIMITER = '-';

    private $client;
    private $url;
    private $pool;
    private $portMin;
    private $portMax;

    public function __construct(string $url, $portRange)
    {
        $range = explode(self::RANGE_DELIMITER, $portRange);
        $this->portMin = $range[0];
        $this->portMax = $range[1];

        $this->url = rtrim($url, '/');
        $this->client = new Client([
            'base_uri' => $this->url,
            'timeout' => 2.0,
        ]);
    }

    public function get(): ?Proxy
    {
        $list = $this->pool ?? $this->list();

        if (empty($list)) {
            $port = rand($this->portMin, $this->portMax);

            $this->create($port);
            $list = $this->list();
        }

        if (!empty($list)) {
            $key = array_rand($list, 1);
            $port = $list[$key];

            return Proxy::create($this->url , $port);
        }

        return null;
    }

    public function list()
    {
        $response = $this->client->get('/proxy');

        $json = json_decode($response->getBody()->getContents(), true);

        if (isset($json['proxyList'])) {

            $ports = [];
            foreach ($json['proxyList'] as $item) {
                $ports[] = $item['port'];
            }

            $this->pool = $ports;

            return $ports;
        }

        return null;
    }

    public function create($port)
    {
        $response = $this->client->post('/proxy', [
            'form_params' => [
                'port' => $port,
                'trustAllServers' => true,
            ]
        ]);

        $response = $response->getBody()->getContents();

        return $response;
    }

    public function delete()
    {
        $response = $this->client->delete('/proxy');

        $response->getBody()->getContents();
    }
}
