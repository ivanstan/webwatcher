<?php

namespace App\Entity;

use App\Property\Id;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\JobQueueRepository")
 * @ORM\Table(name="job_queue")
 */
class Job
{
    use Id;

    /**
     * @var $page
     *
     * @ORM\OneToOne(targetEntity="App\Entity\Page")
     * @ORM\JoinColumn(name="page_id", referencedColumnName="id", nullable=false)
     */
    protected $page;

    /**
     * @return mixed
     */
    public function getPage(): ?Page
    {
        return $this->page;
    }

    /**
     * @param mixed $page
     */
    public function setPage(Page $page): void
    {
        $this->page = $page;
    }
}
