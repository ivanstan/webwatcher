<?php

namespace App\Service\HttpArchive;

class HttpArchive
{
    private $entries;

    public function __construct(string $har)
    {
        try {
            $har = json_decode($har, true);

            if (isset($har['log']) && isset($har['log']['entries'])) {
                $this->entries = $har['log']['entries'];
            }
        } catch (\Exception $exception) {
            $this->entries = null;
        }
    }

    public function getEntry(string $url)
    {
        foreach($this->entries as $entry) {
            $url2 = trim($entry['request']['url'], '"');
            $url2 = rtrim($url2, '"');

            if ($url === $url2) {
                return $entry;
            }
        }

        return null;
    }
}
