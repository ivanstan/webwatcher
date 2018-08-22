<?php

namespace App\Service\Har;

use App\Service\Har\Property\Comment;

class Page
{
    use Comment;

    private $id;

    private $title;

    private $pageTimings = [
        'onContentLoad' => 0,
        'onLoad' => 0,
        'comment' => ''
    ];

    private $startedDateTime;

    public static function new(string $title)
    {
        $instance = new self();

        $instance->setStartedDateTime(new \DateTime());
        $instance->setId($title);
        $instance->setTitle($title);

        return $instance;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id): void
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param mixed $title
     */
    public function setTitle($title): void
    {
        $this->title = $title;
    }

    /**
     * @return array
     */
    public function getPageTimings(): array
    {
        return $this->pageTimings;
    }

    /**
     * @param array $pageTimings
     */
    public function setPageTimings(array $pageTimings): void
    {
        $this->pageTimings = $pageTimings;
    }

    /**
     * @return mixed
     */
    public function getStartedDateTime()
    {
        return $this->startedDateTime;
    }

    /**
     * @param mixed $startedDateTime
     */
    public function setStartedDateTime($startedDateTime): void
    {
        $this->startedDateTime = $startedDateTime;
    }




}
