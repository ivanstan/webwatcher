<?php

namespace App\Service\Har;

use App\Service\Har\Property\Comment;

class Response
{
    use Comment;

    private $status = 0;
    private $statusText = '';
    private $httpVersion = 'HTTP/1.1';
    private $cookies = [];
    private $headers = [];
    private $content;
    private $redirectURL = '';
    private $headersSize = 160;
    private $bodySize = 850;

    /**
     * Response constructor.
     */
    public function __construct()
    {
        $this->content = new Content();
    }

    /**
     * @return int
     */
    public function getStatus(): int
    {
        return $this->status;
    }

    /**
     * @param int $status
     */
    public function setStatus(int $status): void
    {
        $this->status = $status;
    }

    /**
     * @return string
     */
    public function getStatusText(): string
    {
        return $this->statusText;
    }

    /**
     * @param string $statusText
     */
    public function setStatusText(string $statusText): void
    {
        $this->statusText = $statusText;
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
    public function getContent(): Content
    {
        return $this->content;
    }

    /**
     * @param array $content
     */
    public function setContent(Content $content): void
    {
        $this->content = $content;
    }

    /**
     * @return string
     */
    public function getRedirectURL(): string
    {
        return $this->redirectURL;
    }

    /**
     * @param string $redirectURL
     */
    public function setRedirectURL(string $redirectURL): void
    {
        $this->redirectURL = $redirectURL;
    }

    /**
     * @return int
     */
    public function getHeadersSize(): int
    {
        return $this->headersSize;
    }

    /**
     * @param int $headersSize
     */
    public function setHeadersSize(int $headersSize): void
    {
        $this->headersSize = $headersSize;
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
}
