<?php

namespace App\Controller;

use App\Entity\Action\ActionGroup;
use App\Entity\Action\TestAction;
use App\Entity\Assert\AbstractAssert;
use App\Entity\Page;
use App\Form\Assert\AssertSelectType;
use App\Service\System\FormFactory;
use Doctrine\Common\Collections\Collection;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/project/{project}/page/{resource}/group/{group}")
 */
class TestController extends Controller
{

    /**
     * @Route("/new/{type}", name="test_new_assert", methods="GET|POST")
     */
    public function newAssert(Request $request, Page $page, string $type): Response
    {
        $test = new TestAction();

        $em = $this->getDoctrine()->getManager();
        $em->persist($test);
        $em->flush();


        return $this->redirectToRoute('action_test_action_index');
    }

    /**
     * @Route("/{action}", name="test_edit", methods="GET|POST")
     */
    public function list(Request $request, Page $page, TestAction $test, \App\Form\FormFactory $factory): Response
    {
        $form = $this->createForm(AssertSelectType::class, $page);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $type = $form->get('type')->getData();
            /** @var AbstractAssert $assert */
            $assert = new $type();

            if (!$assert instanceof AbstractAssert) {
                throw new NotFoundHttpException(\sprintf('Invalid assert class: ' . $type));
            }

            $assert->setCode(200);
            $assert->setTest($test);
            $this->getDoctrine()->getManager()->persist($assert);

            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('action_test_action_edit', [
                'project' => $page->getProject()->getId(),
                'page' => $page->getId(),
            ]);
        }

        $forms = [];
        $formViews = [];

        foreach ($test->getAsserts() as $key => $assert) {
            $forms[$key] = $factory->create($assert);
            $forms[$key]->handleRequest($request);

            $formViews[$key] = $forms[$key]->createView();

            if ($forms[$key]->isSubmitted() && $forms[$key]->isValid()) {
                $this->getDoctrine()->getManager()->flush();

                return $this->redirectToRoute('action_test_action_edit', [
                    'project' => $page->getProject()->getId(),
                    'page' => $page->getId(),
                ]);
            }
        }

        return $this->render('pages/test/edit.html.twig', [
//            'test_action' => $testAction,
            'forms' => $formViews,
            'form' => $form->createView()
        ]);
    }

    /**
     * @Route("/", name="action_test_action_edit", methods="GET|POST")
     */

    /**
     * @Route("/{id}", name="action_test_action_delete", methods="DELETE")
     */
    public function delete(Request $request, TestAction $testAction): Response
    {
        if ($this->isCsrfTokenValid('delete' . $testAction->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($testAction);
            $em->flush();
        }

        return $this->redirectToRoute('action_test_action_index');
    }
}
