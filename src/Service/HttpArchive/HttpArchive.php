<?php

namespace App\Service\HttpArchive;

use App\Utility\Url;

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

    public function getEntryMap() {
        $result = [];

        foreach($this->entries as $entry) {
            if (isset($entry['request']) && $entry['request']['url']) {
                $url = Url::stripScheme($entry['request']['url']);

                $result[$url] = $entry;
            }
        }

        return $result;
    }

    public function getEntry(string $url)
    {
        $map = $this->getEntryMap();
        $result = null;

        foreach($map as $url => $entry) {
            if ($url === Url::stripScheme($entry['request']['url'])) {

                if (isset($entry['response']) && isset($entry['response']['redirectURL']) && $entry['response']['redirectURL']) {
                    $redirect = Url::stripScheme($entry['response']['redirectURL']);

                    if (isset($map[$redirect])) {
                        $result = $map[$redirect];
                    }
                }

                $result = $entry;
            }
        }

        return $result;
    }
}
