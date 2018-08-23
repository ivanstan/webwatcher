<?php

namespace App\Controller;

use App\Entity\Action\AbstractAction;
use App\Entity\Action\ActionGroup;
use App\Entity\Action\TestAction;
use App\Entity\Assert\AbstractAssert;
use App\Entity\Assert\HTTP\AssertHttpCode;
use App\Entity\Page;
use App\Form\Assert\AssertSelectType;
use App\Service\System\FormFactory;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/project/{project}/resource/{resource}/group/{group}")
 */
class TestController extends Controller
{

    /**
     * @Route("/new/{type}", name="test_new_assert", methods="GET|POST")
     */
    public function new(): Response
    {
        $action = new TestAction();

        $em = $this->getDoctrine()->getManager();
        $em->persist($action);
        $em->flush();

        return $this->redirectToRoute('test_edit', [
            'project' => $action->getGroup()->getResource()->getProject()->getId(),
            'resource' => $action->getGroup()->getResource()->getId(),
            'group' => $action->getGroup()->getId(),
            'action' => $action->getId(),
        ]);
    }

    /**
     * @Route("/action/{action}", name="test_edit", methods="GET|POST")
     */
    public function list(
        Request $request,
        Page $page,
        TestAction $action,
        \App\Form\FormFactory $factory
    ): Response {
        $form = $this->createForm(AssertSelectType::class, $page);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $type = $form->get('type')->getData();
            /** @var AbstractAssert $assert */
            $assert = new $type();

            if (!$assert instanceof AbstractAssert) {
                throw new NotFoundHttpException(\sprintf('Invalid assert class: ' . $type));
            }

            if ($assert instanceof AssertHttpCode) {
                $assert->setCode(200);
            }

            $assert->setTest($action);
            $this->getDoctrine()->getManager()->persist($assert);
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('test_edit', [
                'project' => $action->getGroup()->getResource()->getProject()->getId(),
                'resource' => $action->getGroup()->getResource()->getId(),
                'group' => $action->getGroup()->getId(),
                'action' => $action->getId(),
            ]);
        }

        $forms = [];
        $formViews = [];

        foreach ($action->getAsserts() as $key => $assert) {
            $forms[$key] = $factory->create($assert);
            $forms[$key]->handleRequest($request);

            $formViews[$key] = $forms[$key]->createView();

            if ($forms[$key]->isSubmitted() && $forms[$key]->isValid()) {
                $this->getDoctrine()->getManager()->flush();

                return $this->redirectToRoute('test_edit', [
                    'project' => $action->getGroup()->getResource()->getProject()->getId(),
                    'resource' => $action->getGroup()->getResource()->getId(),
                    'group' => $action->getGroup()->getId(),
                    'action' => $action->getId(),
                ]);
            }
        }

        return $this->render('pages/test/edit.html.twig', [
            'forms' => $formViews,
            'form' => $form->createView(),
            'action' => $action,
        ]);
    }

    /**
     * @Route("/{id}", name="action_test_action_delete", methods="DELETE")
     */
    public function delete(Request $request, TestAction $action): Response
    {
        if ($this->isCsrfTokenValid('delete' . $action->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($action);
            $em->flush();
        }

        return $this->redirectToRoute('test_edit', [
            'project' => $action->getGroup()->getResource()->getProject()->getId(),
            'resource' => $action->getGroup()->getResource()->getId(),
            'group' => $action->getGroup()->getId(),
            'action' => $action->getId(),
        ]);
    }
}
