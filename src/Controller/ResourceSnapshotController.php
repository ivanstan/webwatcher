<?php

namespace App\Controller;

use App\Entity\Resource\AbstractResource;
use App\Entity\Snapshot\AbstractSnapshot;
use App\Service\Factory\ResourceFactory;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("project/{project}/resource/{resource}/snapshot")
 */
class ResourceSnapshotController extends Controller
{
    /**
     * @Route("/{snapshot}", name="resource_snapshot_show", methods="GET", requirements={"snapshot"="\d+"})
     */
    public function show(AbstractSnapshot $snapshot): Response
    {
        return $this->render('pages/snapshot/show.html.twig', [
            'snapshot' => $snapshot,
        ]);
    }

    /**
     * @Route("/new", name="resource_snapshot_new", methods="GET|POST")
     * @Security("has_role('ROLE_MANAGER')")
     */
    public function new(AbstractResource $resource, ResourceFactory $factory)
    {
        try {
            $snapshot = $factory->snapshot($resource);

            $em = $this->getDoctrine()->getManager();
            $em->persist($snapshot);

            $em->flush();
        } catch (\Exception $exception) {
            $this->addFlash('danger', $exception->getMessage());
// ToDo: this goes to exception handler and request shutdown event.
//            /** @var AbstractSnapshot $snapshot */
//            $service->setup($resource->getProject())->snapshot($resource);
//            $service->getDriver()->quit();

            return $this->redirectToRoute('resource_show', [
                'project' => $resource->getProject()->getId(),
                'resource' => $resource->getId(),
            ]);
        }

        return $this->redirectToRoute('resource_snapshot_show', [
            'project' => $resource->getProject()->getId(),
            'resource' => $resource->getId(),
            'snapshot' => $snapshot->getId()
        ]);
    }

    /**
     * @Route("/{snapshot}", name="resource_snapshot_delete", methods="DELETE", requirements={"snapshot"="\d+"})
     * @Security("has_role('ROLE_MANAGER')")
     */
    public function delete(Request $request, AbstractSnapshot $snapshot): Response
    {
        if ($this->isCsrfTokenValid('delete'.$snapshot->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($snapshot);
            $em->flush();
        }

        return $this->redirectToRoute('resource_show', [
            'project' => $snapshot->getResource()->getProject()->getId(),
            'resource' => $snapshot->getResource()->getId(),
        ]);
    }
}
