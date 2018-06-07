<?php

namespace App\Controller;

use App\Entity\Project;
use App\Entity\ProjectSnapshot;
use App\Form\ProjectType;
use App\Service\SnapshotService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProjectController extends Controller
{
    /**
     * @Route("/", name="project_index", methods="GET")
     */
    public function index(): Response
    {
        $projects = $this->getDoctrine()
            ->getRepository(Project::class)
            ->findAll();

        return $this->render('project/index.html.twig', ['projects' => $projects]);
    }

    /**
     * @Route("project/new", name="project_new", methods="GET|POST")
     */
    public function new(Request $request): Response
    {
        $project = new Project();
        $form = $this->createForm(ProjectType::class, $project);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($project);
            $em->flush();

            return $this->redirectToRoute('project_index');
        }

        return $this->render('project/new.html.twig', [
            'project' => $project,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("project/{project}", name="project_show", methods="GET")
     */
    public function show(Project $project): Response
    {
        return $this->render('project/show.html.twig', ['project' => $project]);
    }

    /**
     * @Route("project/{project}/edit", name="project_edit", methods="GET|POST")
     */
    public function edit(Request $request, Project $project): Response
    {
        $form = $this->createForm(ProjectType::class, $project);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('project_edit', ['project' => $project->getId()]);
        }

        return $this->render('project/edit.html.twig', [
            'project' => $project,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("project/{project}", name="project_delete", methods="DELETE")
     */
    public function delete(Request $request, Project $project): Response
    {
        if ($this->isCsrfTokenValid('delete'.$project->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($project);
            $em->flush();
        }

        return $this->redirectToRoute('project_index');
    }

    /**
     * @Route("project/{project}/snapshot", name="project_snapshot_new", methods="GET|POST")
     */
    public function newSnapshot(Project $project, SnapshotService $service)
    {
        $em = $this->getDoctrine()->getManager();
        $dateTime = new \DateTime();

        $projectSnapshot = new ProjectSnapshot();
        $projectSnapshot->setTimestamp($dateTime->getTimestamp());
        $projectSnapshot->setProject($project);
        $em->persist($projectSnapshot);

        foreach ($project->getPages() as $page) {
            $snapshot = $service->new($page);
            $snapshot->setTimestamp($dateTime->getTimestamp());
            $snapshot->setProjectSnapshot($projectSnapshot);

            $em->persist($snapshot);
        }

        $em->flush();

        return $this->redirectToRoute('project_show', ['project' => $project->getId()]);
    }
}
