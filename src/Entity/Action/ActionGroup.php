<?php

namespace App\Entity\Action;

use App\Entity\AbstractResource;
use App\Property\Id;
use App\Property\Name;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="action_group")
 */
class ActionGroup
{
    use Id;
    use Name;

    /**
     * @var AbstractAction[]|Collection
     *
     * @ORM\OneToMany(targetEntity="App\Entity\Action\AbstractAction", mappedBy="group", cascade={"persist"}, fetch="EAGER")
     */
    protected $actions;

    /**
     * @var AbstractResource
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\AbstractResource", inversedBy="actions", cascade={"persist"}, fetch="EAGER")
     * @ORM\JoinColumn(name="resource_id", referencedColumnName="id", onDelete="CASCADE", nullable=false)
     */
    protected $resource;

    /**
     * @return AbstractAction[]|Collection
     */
    public function getActions()
    {
        return $this->actions;
    }

    /**
     * @param AbstractAction[]|Collection $actions
     */
    public function setActions($actions): void
    {
        $this->actions = $actions;
    }

    public function getResource(): AbstractResource
    {
        return $this->resource;
    }

    public function setResource(AbstractResource $resource): void
    {
        $this->resource = $resource;
    }
}
