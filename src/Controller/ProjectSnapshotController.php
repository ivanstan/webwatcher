<?php

namespace App\Controller;

use App\Entity\ProjectSnapshot;
use App\Form\ProjectSnapshotType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/project/snapshot")
 */
class ProjectSnapshotController extends Controller
{
    /**
     * @Route("/", name="project_snapshot_index", methods="GET")
     */
    public function index(): Response
    {
        $projectSnapshots = $this->getDoctrine()
            ->getRepository(ProjectSnapshot::class)
            ->findAll();

        return $this->render('project_snapshot/index.html.twig', ['project_snapshots' => $projectSnapshots]);
    }

    /**
     * @Route("/new", name="project_snapshot_new", methods="GET|POST")
     */
    public function new(Request $request): Response
    {
        $projectSnapshot = new ProjectSnapshot();
        $form = $this->createForm(ProjectSnapshotType::class, $projectSnapshot);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($projectSnapshot);
            $em->flush();

            return $this->redirectToRoute('project_snapshot_index');
        }

        return $this->render('project_snapshot/new.html.twig', [
            'project_snapshot' => $projectSnapshot,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="project_snapshot_show", methods="GET")
     */
    public function show(ProjectSnapshot $projectSnapshot): Response
    {
        return $this->render('project_snapshot/show.html.twig', ['project_snapshot' => $projectSnapshot]);
    }

    /**
     * @Route("/{id}/edit", name="project_snapshot_edit", methods="GET|POST")
     */
    public function edit(Request $request, ProjectSnapshot $projectSnapshot): Response
    {
        $form = $this->createForm(ProjectSnapshotType::class, $projectSnapshot);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('project_snapshot_edit', ['id' => $projectSnapshot->getId()]);
        }

        return $this->render('project_snapshot/edit.html.twig', [
            'project_snapshot' => $projectSnapshot,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="project_snapshot_delete", methods="DELETE")
     */
    public function delete(Request $request, ProjectSnapshot $projectSnapshot): Response
    {
        if ($this->isCsrfTokenValid('delete'.$projectSnapshot->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($projectSnapshot);
            $em->flush();
        }

        return $this->redirectToRoute('project_snapshot_index');
    }
}
