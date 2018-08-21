<?php

namespace App\Entity;

use App\Property\Id;
use App\Property\Timestamp;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table("snapshot")
 * @ORM\InheritanceType("JOINED")
 * @ORM\DiscriminatorColumn(name="type", type="string")
 * @ORM\DiscriminatorMap({
 *     Page::TYPE = "App\Entity\PageSnapshot",
 *     ProjectSnapshot::TYPE = "App\Entity\ProjectSnapshot",
 * })
 */
abstract class AbstractSnapshot
{
    use Id;
    use Timestamp;

    /**
     * @var Page
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\AbstractResource", inversedBy="snapshots", cascade={"persist"})
     * @ORM\JoinColumn(name="page_id", referencedColumnName="id", onDelete="CASCADE", nullable=true)
     */
    protected $page;

    /**
     * @var ProjectSnapshot
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\ProjectSnapshot", inversedBy="snapshots", cascade={"persist"})
     * @ORM\JoinColumn(name="project_snapshot_id", referencedColumnName="id", onDelete="CASCADE", nullable=true)
     */
    protected $snapshot;

    public function getPage(): ?Page
    {
        return $this->page;
    }

    public function setPage(?Page $page)
    {
        $this->page = $page;
    }

    public function getProjectSnapshot(): ?ProjectSnapshot
    {
        return $this->snapshot;
    }

    public function setProjectSnapshot(?ProjectSnapshot $snapshot): void
    {
        $this->snapshot = $snapshot;
    }
}
