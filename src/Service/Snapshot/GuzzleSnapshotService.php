<?php

namespace App\Service\Snapshot;

use App\Entity\Page as PageResource;
use App\Entity\PageSnapshot;
use App\Service\Factory\PageSnapshotFactory;
use App\Service\Har\Archive;
use App\Service\Har\Entry;
use App\Service\Har\Page;
use App\Service\Har\Request;
use App\Service\Har\Response;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class GuzzleSnapshotService implements SnapshotServiceInterface
{
    private $factory;
    private $client;
    private $serializer;

    public function __construct(PageSnapshotFactory $factory, SerializerInterface $serializer)
    {
        $this->factory = $factory;
        $this->client = new Client(['verify' => false]);
        $this->serializer = $serializer;
    }

    /**
     * @param PageResource $page
     */
    public function snapshot($resource): PageSnapshot
    {
        $snapshot = $this->factory->create($resource);

        try {
            $response = $this->client->request('GET', $resource->getUrl());
        } catch (RequestException $exception) {
            $exception->getRequest();
            if (!$exception->hasResponse()) {
                return $snapshot;
            }

            $response = $exception->getResponse();
        }

        $pageTitle = 'resource-' . $resource->getId() . '-snapshot-' . $snapshot->getId();
        $har = Archive::new();
        $har->addPage(Page::new($pageTitle));

        $harResponse = new Response();
        $content = $response->getBody()->getContents();
        $harResponse->getContent()->setText($content);

        $harRequest = new Request();
        $harRequest->setUrl($resource->getUrl());

        $entry = new Entry();
        $entry->setRequest($harRequest)->setResponse($harResponse);

        $har->addEntry($entry);

        $har = $this->serializer->serialize($har, 'json');
        $snapshot->setHar(json_decode($har, true));

        $snapshot->setHeaders($response->getHeaders());
        $snapshot->setStatus($response->getStatusCode());

        return $snapshot;
    }
}
