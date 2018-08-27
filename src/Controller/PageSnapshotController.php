<?php

namespace App\Controller;

use App\Entity\AbstractSnapshot;
use App\Entity\Action\TestAction;
use App\Entity\Page;
use App\Entity\PageSnapshot;
use App\Entity\TestResult;
use App\Service\Snapshot\PageSnapshotService;
use App\Service\TestRunner;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("project/{project}/page/{page}/snapshot")
 */
class PageSnapshotController extends Controller
{
    /**
     * @Route("/{snapshot}", name="page_snapshot_show", methods="GET", requirements={"snapshot"="\d+"})
     */
    public function show(PageSnapshot $snapshot): Response
    {
        return $this->render('pages/page_snapshot/show.html.twig', [
            'snapshot' => $snapshot,
        ]);
    }

    /**
     * @Route("/{snapshot}/run", name="page_snapshot_run", methods="GET", requirements={"snapshot"="\d+"})
     */
    public function run(PageSnapshot $snapshot, TestRunner $runner): Response
    {
        foreach ($snapshot->getPage()->getActions() as $group) {
            foreach ($group->getActions() as $action) {

                if ($action instanceof TestAction) {
                    $runner->execute($snapshot, $action);
                }
            }
        }

        return $this->redirectToRoute('page_snapshot_show', [
            'project' => $snapshot->getPage()->getProject()->getId(),
            'page' => $snapshot->getPage()->getId(),
            'snapshot' => $snapshot->getId(),
            '_fragment' => 'actions',
        ]);
    }

    /**
     * @Route("/new", name="page_snapshot_new", methods="GET|POST")
     * @Security("has_role('ROLE_MANAGER')")
     */
    public function new(Page $page, PageSnapshotService $service)
    {
        /** @var AbstractSnapshot $snapshot */
        $em = $this->getDoctrine()->getManager();

        $snapshot = $service->setup($page->getProject());

        try {
            $service->snapshot($page);
            $em->persist($snapshot);

            $em->flush();

            return $this->redirectToRoute('page_snapshot_show', [
                'project' => $page->getProject()->getId(),
                'page' => $page->getId(),
                'snapshot' => $snapshot->getId()
            ]);
        } catch (\Exception $exception) {
            $this->addFlash('danger', $exception->getMessage());
            $service->getDriver()->quit();
        }

        return $this->redirectToRoute('page_show', [
            'project' => $page->getProject()->getId(),
            'page' => $page->getId(),
        ]);
    }

    /**
     * @Route("/{snapshot}/result/{result}", name="page_snapshot_test_result", methods="GET|POST")
     */
    public function result(TestResult $result)
    {

        return $this->render('pages/test/result.html.twig', [
            'result' => $result
        ]);
    }

    /**
     * @Route("/{snapshot}", name="page_snapshot_delete", methods="DELETE", requirements={"snapshot"="\d+"})
     * @Security("has_role('ROLE_MANAGER')")
     */
    public function delete(Request $request, PageSnapshot $snapshot): Response
    {
        if ($this->isCsrfTokenValid('delete'.$snapshot->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($snapshot);
            $em->flush();
        }

        return $this->redirectToRoute('page_show', [
            'project' => $snapshot->getPage()->getProject()->getId(),
            'page' => $snapshot->getPage()->getId(),
        ]);
    }
}
