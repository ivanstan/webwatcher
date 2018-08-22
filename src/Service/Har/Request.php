<?php

namespace App\Service\Har;

class Request
{
    private $method = 'GET';

    private $url;

    private $httpVersion = 'HTTP/1.1';

    private $cookies = [];

    private $headers = [];

    private $queryString = [];

    private $postData = [];

    private $headerSize = 0;

    private $bodySize = 0;

    private $comment = '';

    /**
     * @return string
     */
    public function getMethod(): string
    {
        return $this->method;
    }

    /**
     * @param string $method
     */
    public function setMethod(string $method): void
    {
        $this->method = $method;
    }

    /**
     * @return mixed
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * @param mixed $url
     */
    public function setUrl($url): void
    {
        $this->url = $url;
    }

    /**
     * @return string
     */
    public function getHttpVersion(): string
    {
        return $this->httpVersion;
    }

    /**
     * @param string $httpVersion
     */
    public function setHttpVersion(string $httpVersion): void
    {
        $this->httpVersion = $httpVersion;
    }

    /**
     * @return array
     */
    public function getCookies(): array
    {
        return $this->cookies;
    }

    /**
     * @param array $cookies
     */
    public function setCookies(array $cookies): void
    {
        $this->cookies = $cookies;
    }

    /**
     * @return array
     */
    public function getHeaders(): array
    {
        return $this->headers;
    }

    /**
     * @param array $headers
     */
    public function setHeaders(array $headers): void
    {
        $this->headers = $headers;
    }

    /**
     * @return array
     */
    public function getQueryString(): array
    {
        return $this->queryString;
    }

    /**
     * @param array $queryString
     */
    public function setQueryString(array $queryString): void
    {
        $this->queryString = $queryString;
    }

    /**
     * @return array
     */
    public function getPostData(): array
    {
        return $this->postData;
    }

    /**
     * @param array $postData
     */
    public function setPostData(array $postData): void
    {
        $this->postData = $postData;
    }

    /**
     * @return int
     */
    public function getHeaderSize(): int
    {
        return $this->headerSize;
    }

    /**
     * @param int $headerSize
     */
    public function setHeaderSize(int $headerSize): void
    {
        $this->headerSize = $headerSize;
    }

    /**
     * @return int
     */
    public function getBodySize(): int
    {
        return $this->bodySize;
    }

    /**
     * @param int $bodySize
     */
    public function setBodySize(int $bodySize): void
    {
        $this->bodySize = $bodySize;
    }

    /**
     * @return string
     */
    public function getComment(): string
    {
        return $this->comment;
    }

    /**
     * @param string $comment
     */
    public function setComment(string $comment): void
    {
        $this->comment = $comment;
    }
}
