<?php

namespace App\Service\Snapshot;

use App\Entity\Resource\HttpResource;
use App\Entity\Snapshot\HttpResourceSnapshot;
use GuzzleHttp\Client;

class HttpSnapshotService implements SnapshotServiceInterface
{
    /**
     * @param HttpResource $resource
     * @return HttpResourceSnapshot
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function snapshot($resource): HttpResourceSnapshot
    {
        $snapshot = new HttpResourceSnapshot();

        $snapshot->setTimestamp(time());
        $snapshot->setResource($resource);

        $client = new Client([
            'verify' => false,
        ]);

        $response = $client->request('GET', $resource->getUrl());

        $snapshot->setStatus($response->getStatusCode());
        $snapshot->setHeaders($response->getHeaders());
        $snapshot->setContent($response->getBody());

        return $snapshot;
    }
}
