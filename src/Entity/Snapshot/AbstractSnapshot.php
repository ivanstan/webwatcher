<?php

namespace App\Entity\Snapshot;

use App\Entity\Project;
use App\Entity\Resource\AbstractResource;
use App\Entity\Resource\HttpResource;
use App\Entity\Resource\PageResource;
use App\Property\Id;
use App\Property\Timestamp;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table("snapshot")
 * @ORM\InheritanceType("JOINED")
 * @ORM\DiscriminatorColumn(name="type", type="string")
 * @ORM\DiscriminatorMap({
 *     Project::RESOURCE_TYPE = "App\Entity\Snapshot\ProjectSnapshot",
 *     HttpResource::RESOURCE_TYPE = "App\Entity\Snapshot\HttpResourceSnapshot",
 *     PageResource::RESOURCE_TYPE = "App\Entity\Snapshot\PageSnapshot",
 * })
 */
abstract class AbstractSnapshot
{
    use Id;
    use Timestamp;

    /**
     * @var AbstractResource
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Resource\AbstractResource", inversedBy="snapshots", cascade={"persist"})
     * @ORM\JoinColumn(name="resource_id", referencedColumnName="id", onDelete="CASCADE", nullable=true)
     */
    protected $resource;

    /**
     * @var ProjectSnapshot
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Snapshot\ProjectSnapshot", inversedBy="snapshots", cascade={"persist"})
     * @ORM\JoinColumn(name="project_snapshot_id", referencedColumnName="id", onDelete="CASCADE", nullable=true)
     */
    protected $snapshot;

    public function getResource(): ?AbstractResource
    {
        return $this->resource;
    }

    public function setResource(?AbstractResource $resource)
    {
        $this->resource = $resource;
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
