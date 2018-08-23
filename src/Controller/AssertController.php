<?php


namespace App\Controller;

use App\Entity\Assert\AbstractAssert;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/project/{project}/resource/{resource}/group/{group}/action/{action}/assert")
 */
class AssertController extends Controller
{
    /**
     * @Route("/{id}", name="assert_delete", methods="DELETE")
     */
    public function delete(Request $request, AbstractAssert $assert): Response
    {
        if ($this->isCsrfTokenValid('delete' . $assert->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($assert);
            $em->flush();
        }

        return $this->redirectToRoute('test_edit', [
            'project' => $assert->getTest()->getGroup()->getResource()->getProject()->getId(),
            'resource' => $assert->getTest()->getGroup()->getResource()->getId(),
            'group' => $assert->getTest()->getGroup(),
            'action' => $assert->getTest(),
        ]);
    }

}
