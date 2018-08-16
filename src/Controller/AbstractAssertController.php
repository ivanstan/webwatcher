<?php

namespace App\Controller;

use App\Entity\Assert\AbstractAssert;
use App\Entity\Assert\HTTP\AssertHttpCode;
use App\Form\Assert\AbstractAssertType;
use App\Form\Assert\AssertHttpCodeType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/assert/abstract/assert")
 */
class AbstractAssertController extends Controller
{
    /**
     * @Route("/", name="assert_abstract_assert_index", methods="GET")
     */
    public function index(): Response
    {
        $abstractAsserts = $this->getDoctrine()
            ->getRepository(AbstractAssert::class)
            ->findAll();

        return $this->render('assert_abstract_assert/index.html.twig', ['abstract_asserts' => $abstractAsserts]);
    }

    /**
     * @Route("/new", name="assert_abstract_assert_new", methods="GET|POST")
     */
    public function new(Request $request): Response
    {
        $abstractAssert = new AssertHttpCode();
        $form = $this->createForm(AssertHttpCodeType::class, $abstractAssert);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($abstractAssert);
            $em->flush();

            return $this->redirectToRoute('assert_abstract_assert_index');
        }

        return $this->render('assert_abstract_assert/new.html.twig', [
            'abstract_assert' => $abstractAssert,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="assert_abstract_assert_show", methods="GET")
     */
    public function show(AbstractAssert $abstractAssert): Response
    {
        return $this->render('assert_abstract_assert/show.html.twig', ['abstract_assert' => $abstractAssert]);
    }

    /**
     * @Route("/{id}/edit", name="assert_abstract_assert_edit", methods="GET|POST")
     */
    public function edit(Request $request, AbstractAssert $abstractAssert): Response
    {
        $form = $this->createForm(AbstractAssertType::class, $abstractAssert);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('assert_abstract_assert_edit', ['id' => $abstractAssert->getId()]);
        }

        return $this->render('assert_abstract_assert/edit.html.twig', [
            'abstract_assert' => $abstractAssert,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="assert_abstract_assert_delete", methods="DELETE")
     */
    public function delete(Request $request, AbstractAssert $abstractAssert): Response
    {
        if ($this->isCsrfTokenValid('delete'.$abstractAssert->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($abstractAssert);
            $em->flush();
        }

        return $this->redirectToRoute('assert_abstract_assert_index');
    }
}
