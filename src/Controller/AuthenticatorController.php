<?php

namespace App\Controller;

use App\Entity\Authenticator\Authenticator;
use App\Entity\Project;
use App\Form\Authenticator\SeleniumAuthenticatorType;
use App\Service\Factory\AuthenticatorFactory;
use App\Service\Selenium\SeleniumAuthenticatorService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("project/{project}/authenticator")
 */
class AuthenticatorController extends Controller
{
    /**
     * @Route("/", name="authenticator_index", methods="GET")
     */
    public function index(): Response
    {
        $authenticators = $this->getDoctrine()
            ->getRepository(Authenticator::class)
            ->findAll()
        ;

        return $this->render('pages/authenticator/index.html.twig', ['authenticators' => $authenticators]);
    }

    /**
     * @Route("/{type}/new", name="authenticator_new", methods="GET|POST")
     */
    public function new(Request $request, Project $project, string $type, AuthenticatorFactory $factory): Response
    {
        $authenticator = $factory->create($type);
        $form = $this->createForm($factory->getFormType($type), $authenticator);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($authenticator);
            $em->flush();

            return $this->redirectToRoute('authenticator_index');
        }

        return $this->render('pages/authenticator/new.html.twig', [
            'authenticator' => $authenticator,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="authenticator_show", methods="GET")
     */
    public function show(Authenticator $authenticator): Response
    {
        return $this->render('pages/authenticator/show.html.twig', ['authenticator' => $authenticator]);
    }

    /**
     * @Route("/{id}/edit", name="authenticator_edit", methods="GET|POST")
     */
    public function edit(Request $request, Authenticator $authenticator, SeleniumAuthenticatorService $seleniumAuthenticator): Response
    {
        $form = $this->createForm(SeleniumAuthenticatorType::class, $authenticator);
        $form->handleRequest($request);
        $cookies = [];

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            $cookies = $seleniumAuthenticator->resolve($authenticator);

//            return $this->redirectToRoute('authenticator_edit', [
//                'project' => $authenticator->getProject(),
//                'id' => $authenticator->getId()
//            ]);
        }

        return $this->render('pages/authenticator/edit.html.twig', [
            'authenticator' => $authenticator,
            'form' => $form->createView(),
            'cookies' => $cookies
        ]);
    }

    /**
     * @Route("/{id}", name="authenticator_delete", methods="DELETE")
     */
    public function delete(Request $request, Authenticator $authenticator): Response
    {
        if ($this->isCsrfTokenValid('delete' . $authenticator->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($authenticator);
            $em->flush();
        }

        return $this->redirectToRoute('authenticator_index');
    }
}
