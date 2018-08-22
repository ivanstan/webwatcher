<?php

namespace App\Service\Har;

use App\Service\Har\Property\Comment;

class Entry
{
    use Comment;

    private $pageref = '';
    private $startedDateTime = [];
    private $time = 50;
    private $request;
    private $response;
    private $cache = [];
    private $timings = [];
    private $serverIPAddress = '';
    private $connection = '';

    /**
     * @return string
     */
    public function getPageref(): string
    {
        return $this->pageref;
    }

    /**
     * @param string $pageref
     */
    public function setPageref(string $pageref): void
    {
        $this->pageref = $pageref;
    }

    /**
     * @return array
     */
    public function getStartedDateTime(): array
    {
        return $this->startedDateTime;
    }

    /**
     * @param array $startedDateTime
     */
    public function setStartedDateTime(array $startedDateTime): void
    {
        $this->startedDateTime = $startedDateTime;
    }

    /**
     * @return int
     */
    public function getTime(): int
    {
        return $this->time;
    }

    /**
     * @param int $time
     */
    public function setTime(int $time): void
    {
        $this->time = $time;
    }

    /**
     * @return array
     */
    public function getRequest(): ?Request
    {
        return $this->request;
    }

    /**
     * @param array $request
     */
    public function setRequest(Request $request): self
    {
        $this->request = $request;

        return $this;
    }

    /**
     * @return array
     */
    public function getResponse(): Response
    {
        return $this->response;
    }

    /**
     * @param array $response
     */
    public function setResponse(Response $response): self
    {
        $this->response = $response;

        return $this;
    }

    /**
     * @return array
     */
    public function getCache(): array
    {
        return $this->cache;
    }

    /**
     * @param array $cache
     */
    public function setCache(array $cache): void
    {
        $this->cache = $cache;
    }

    /**
     * @return array
     */
    public function getTimings(): array
    {
        return $this->timings;
    }

    /**
     * @param array $timings
     */
    public function setTimings(array $timings): void
    {
        $this->timings = $timings;
    }

    /**
     * @return string
     */
    public function getServerIPAddress(): string
    {
        return $this->serverIPAddress;
    }

    /**
     * @param string $serverIPAddress
     */
    public function setServerIPAddress(string $serverIPAddress): void
    {
        $this->serverIPAddress = $serverIPAddress;
    }

    /**
     * @return string
     */
    public function getConnection(): string
    {
        return $this->connection;
    }

    /**
     * @param string $connection
     */
    public function setConnection(string $connection): void
    {
        $this->connection = $connection;
    }
}
