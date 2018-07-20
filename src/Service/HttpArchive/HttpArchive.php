<?php

namespace App\Service\HttpArchive;

class HttpArchive
{
    private $entries;

    private $har;

    public static function fromString(string $har): self
    {
        $instance = new self();
        $instance->setHar(json_decode($har, true));

        return $instance;
    }

    public static function fromArray(array $har): self
    {
        $instance = new self();
        $instance->setHar($har);

        return $instance;
    }

    public function getHar() {
        return $this->har;
    }

    public function setHar($har): void
    {
        $this->har = $har;

        if (isset($har['log']) && isset($har['log']['entries'])) {
            $this->entries = $har['log']['entries'];
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

            return $this->getRedirectEntry(\GuzzleHttp\Psr7\Uri::fromParts($parsed));
        }

        return $result;
    }
}
