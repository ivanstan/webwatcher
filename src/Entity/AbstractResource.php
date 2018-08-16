<?php

namespace App\Entity;

use App\Entity\Action\ActionGroup;
use App\Property\Id;
use App\Property\Name;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table("resource")
 * @ORM\InheritanceType("JOINED")
 * @ORM\DiscriminatorColumn(name="type", type="string")
 * @ORM\DiscriminatorMap({
 *     AbstractResource::RESOURCE_TYPE_PAGE = "App\Entity\Page",
 * })
 */
abstract class AbstractResource
{
    public const RESOURCE_TYPE_PAGE = 'page';

    use Name;
    use Id;

    /**
     * @var Project
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Project", inversedBy="pages", cascade={"persist"}, fetch="EAGER")
     * @ORM\JoinColumn(name="project_id", referencedColumnName="id", onDelete="CASCADE", nullable=false)
     */
    protected $project;

    /**
     * @var AbstractSnapshot[]|Collection
     *
     * @ORM\OneToMany(targetEntity="App\Entity\AbstractSnapshot", mappedBy="page", cascade={"persist"})
     * @ORM\OrderBy({"timestamp" = "DESC"})
     */
    protected $snapshots;

    /**
     * @var ActionGroup[]|Collection
     *
     * @ORM\OneToMany(targetEntity="App\Entity\Action\ActionGroup", mappedBy="resource", cascade={"persist"})
     */
    protected $actions;

    public function getProject(): ?Project
    {
        return $this->project;
    }

    public function setProject(Project $project)
    {
        $this->project = $project;
    }

    /**
     * @return PageSnapshot[]|Collection
     */
    public function getSnapshots()
    {
        return $this->snapshots;
    }

    /**
     * @param PageSnapshot[]|Collection $snapshots
     */
    public function setSnapshots($snapshots)
    {
        $this->snapshots = $snapshots;
    }

    public function getNewestSnapshot(): ?PageSnapshot
    {
        if (isset($this->snapshots[0])) {
            return $this->snapshots[0];
        }

        return null;
    }

    /**
     * @return ActionGroup[]|Collection
     */
    public function getActions()
    {
        return $this->actions;
    }

    /**
     * @param ActionGroup[]|Collection $actions
     */
    public function setActions($actions): void
    {
        $this->actions = $actions;
    }
}
