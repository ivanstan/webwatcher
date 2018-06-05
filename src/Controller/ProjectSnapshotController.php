<?php

namespace App\Controller;

use App\Entity\ProjectSnapshot;
use App\Form\ProjectSnapshotType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/project/{project}/snapshot")
 */
class ProjectSnapshotController extends Controller
{
    /**
     * @Route("/{snapshot}", name="project_snapshot_show", methods="GET")
     */
    public function show(ProjectSnapshot $snapshot): Response
    {
        return $this->render('project_snapshot/show.html.twig', ['project_snapshot' => $snapshot]);
    }

    /**
     * @Route("/{snapshot}/edit", name="project_snapshot_edit", methods="GET|POST")
     */
    public function edit(Request $request, ProjectSnapshot $snapshot): Response
    {
        $form = $this->createForm(ProjectSnapshotType::class, $snapshot);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('project_snapshot_edit', [
                'project' => $snapshot->getProject()->getId(),
                'snapshot' => $snapshot->getId(),
            ]);
        }

        return $this->render('project_snapshot/edit.html.twig', [
            'project_snapshot' => $snapshot,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{snapshot}", name="project_snapshot_delete", methods="DELETE")
     */
    public function delete(Request $request, ProjectSnapshot $snapshot): Response
    {
        if ($this->isCsrfTokenValid('delete'.$snapshot->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($snapshot);
            $em->flush();
        }

        return $this->redirectToRoute('project_snapshot_index');
    }
}
