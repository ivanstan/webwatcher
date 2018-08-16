<?php

namespace App\Controller;

use App\Entity\Project;
use App\Entity\Resource\AbstractResource;
use App\Service\Factory\ResourceFactory;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("project/{project}/resource")
 */
class ResourceController extends Controller
{
    /**
     * @Route("/new/{type}", name="resource_new", methods="GET|POST")
     * @Security("has_role('ROLE_MANAGER')")
     */
    public function new(Request $request, Project $project, string $type, ResourceFactory $factory): Response
    {
        $resource = $factory->entity($type, $project);

        $form = $factory->form($resource);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($resource);
            $em->flush();

            $url = $this->generateUrl('resource_show',
                ['project' => $project->getId(), 'resource' => $resource->getId()]);
            $this->addFlash('success',
                sprintf('New resource "%s" has been created.', "<a href='$url'>{$resource->getName()}</a>")
            );

            return $this->redirectToRoute('resource_new', ['project' => $project->getId(), 'type' => $type]);
        }

        return $this->render(
            'pages/resource/new.html.twig',
            [
                'resource' => $resource,
                'form' => $form->createView(),
            ]
        );
    }

    /**
     * @Route("/{resource}", name="resource_show", methods="GET")
     */
    public function show(AbstractResource $resource): Response
    {
        return $this->render('pages/resource/show.html.twig', ['resource' => $resource]);
    }

    /**
     * @Route("/{resource}/edit", name="resource_edit", methods="GET|POST")
     * @Security("has_role('ROLE_MANAGER')")
     */
    public function edit(Request $request, AbstractResource $resource, ResourceFactory $factory): Response
    {
        $form = $factory->form($resource);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('resource_edit', [
                'project' => $resource->getProject()->getId(),
                'resource' => $resource->getId(),
            ]);
        }

        return $this->render(
            'pages/resource/edit.html.twig',
            [
                'resource' => $resource,
                'form' => $form->createView(),
            ]
        );
    }

    /**
     * @Route("/{resource}", name="resource_delete", methods="DELETE")
     * @Security("has_role('ROLE_MANAGER')")
     */
    public function delete(Request $request, AbstractResource $resource): Response
    {
        if ($this->isCsrfTokenValid('delete' . $resource->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($resource);
            $em->flush();
        }

        return $this->redirectToRoute('project_show', ['project' => $resource->getProject()->getId()]);
    }
}
