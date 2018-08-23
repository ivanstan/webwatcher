<?php

namespace App\Controller;

use App\Entity\AbstractSnapshot;
use App\Entity\Page;
use App\Entity\PageSnapshot;
use App\Service\Snapshot\PageSnapshotService;
use Facebook\WebDriver\Exception\UnknownServerException;
use Facebook\WebDriver\Exception\WebDriverCurlException;
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
     * @Route("/new", name="snapshot_page_new", methods="GET|POST")
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

        } catch (UnknownServerException $exception) {
            $this->addFlash('danger', $exception->getMessage());
            $service->getDriver()->quit();
        } catch (WebDriverCurlException $exception) {
            $this->addFlash('danger', $exception->getMessage());
            $service->getDriver()->quit();
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
