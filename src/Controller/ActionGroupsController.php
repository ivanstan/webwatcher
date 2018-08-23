<?php

namespace App\Controller;

use App\Entity\AbstractResource;
use App\Entity\Action\AbstractAction;
use App\Entity\Action\ActionGroup;
use App\Form\FormFactory;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/project/{project}/resource/{resource}/groups")
 */
class ActionGroupsController extends Controller
{
    /**
     * @Route("/new", name="action_group_new", methods="GET|POST")
     */
    public function new(Request $request, AbstractResource $resource, FormFactory $factory)
    {
        $group = new ActionGroup();
        $group->setResource($resource);

        $form = $factory->create($group);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->persist($group);
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('action_group_index', [
                'project' => $resource->getProject()->getId(),
                'resource' => $resource->getId(),
            ]);
        }

        return $this->render('pages/groups/new.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{group}/edit", name="action_group_edit", methods="GET|POST")
     */
    public function edit(Request $request, AbstractResource $resource, ActionGroup $group, FormFactory $factory)
    {
        $form = $factory->create($group);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->persist($group);
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('action_group_index', [
                'project' => $resource->getProject()->getId(),
                'resource' => $resource->getId(),
            ]);
        }

        return $this->render('pages/groups/edit.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}
