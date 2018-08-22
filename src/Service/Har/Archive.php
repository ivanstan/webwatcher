<?php

namespace App\Service\Har;

class Archive
{
    private $entries;

    private $log;

    public static function new()
    {
        $instance = new self();
        $instance->log = [];
        $instance->log['pages'] = [];
        $instance->log['comment'] = '';
        $instance->log['creator'] = [];
        $instance->log['creator']['name'] = '';
        $instance->log['creator']['comment'] = '';
        $instance->log['creator']['version'] = '';
        $instance->log['entries'] = [];
        $instance->log['version'] = '1.2';

        return $instance;
    }

    public function addPage(Page $page)
    {
        $this->log['pages'][] = $page;
    }

    public function addEntry(Entry $entry)
    {
        $this->log['entries'][] = $entry;
    }

    public static function fromString(string $har): self
    {
        $instance = new self();
        $instance->setLog(json_decode($har, true));

        return $instance;
    }

    public static function fromArray(array $har): self
    {
        $instance = new self();
        $instance->setLog($har);

        return $instance;
    }

    public function getLog() {
        return $this->log;
    }

    public function setLog($log): void
    {
        $this->log = $log;

        if (isset($log['log']) && isset($log['log']['entries'])) {
            $this->entries = $log['log']['entries'];
        }
    }

    public function getRedirectEntry(string $url): array
    {
        $result = $this->getEntry($url);

        if (isset($result['response']) && isset($result['response']['redirectURL']) && $result['response']['redirectURL']) {
            return $this->getRedirectEntry($result['response']['redirectURL']);
        }

        return $result;
    }

    public function getEntry(string $url)
    {
        $parsed = parse_url($url);
        $result = null;

        foreach($this->entries as $entry) {
            if ($url === $entry['request']['url']) {
                $result = $entry;
            }
        }

        if ($result === null) { // try with different scheme (case of internal redirection)
            $scheme = parse_url($url, PHP_URL_SCHEME) === 'http' ? 'https' : 'http';
            $parsed['scheme'] = $scheme;

//            return $this->getRedirectEntry(\GuzzleHttp\Psr7\Uri::fromParts($parsed));
        }

        return $result;
    }
}
