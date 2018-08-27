<?php

namespace App\Controller;

use App\Entity\AbstractResource;
use App\Entity\Action\TestAction;
use App\Entity\Assert\AbstractAssert;
use App\Form\Assert\AssertSelectType;
use App\Service\Assert\AssertService;
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
    private $service;

    public function __construct(AssertService $service)
    {
        $this->service = $service;
    }

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
    public function list(Request $request, AbstractResource $resource, TestAction $action): Response
    {
        $form = $this->createForm(AssertSelectType::class, $resource);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $type = $form->get('type')->getData();
            /** @var AbstractAssert $assert */
            $assert = new $type();

            if (!$assert instanceof AbstractAssert) {
                throw new NotFoundHttpException(\sprintf('Invalid assert class: ' . $type));
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
            $forms[$key] = $this->service->getForm($assert);
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
     * @Route("/{id}", name="test_delete", methods="DELETE")
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
