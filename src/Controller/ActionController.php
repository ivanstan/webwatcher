<?php

namespace App\Controller;

use App\Entity\Action\AbstractAction;
use App\Entity\Action\ActionGroup;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/project/{project}/page/{resource}/group/{group}")
 */
class ActionController extends Controller
{
    /**
     * @Route("/{type}/new", name="action_new", methods="GET|POST")
     */
    public function new(ActionGroup $group, string $type)
    {
        $map = $this->getDoctrine()->getManager()->getClassMetadata(AbstractAction::class)->discriminatorMap;

        if (!isset($map[$type])) {
            throw new NotFoundHttpException(\sprintf('Action type %s not found.', $type));
        }

        /** @var AbstractAction $action */
        $action = new $map[$type]();
        $action->setGroup($group);

        if ($action instanceof \App\Entity\Action\TestAction) {
            $this->getDoctrine()->getManager()->persist($action);
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('test_edit', [
                'project' => $group->getResource()->getProject()->getId(),
                'resource' => $group->getResource()->getId(),
                'group' => $group->getId(),
                'action' => $action->getId(),
            ]);
        }
    }

    /**
     * @Route("/{id}", name="action_delete", methods="DELETE")
     */
    public function delete(Request $request, AbstractAction $action): Response
    {
        if ($this->isCsrfTokenValid('delete' . $action->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($action);
            $em->flush();
        }

        return $this->redirectToRoute('page_show', [
            'project' => $action->getGroup()->getResource()->getProject()->getId(),
            'page' => $action->getGroup()->getResource()->getId(),
            '_fragment' => 'actions'
        ]);
    }
}
