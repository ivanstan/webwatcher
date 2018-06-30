<?php

namespace App\Controller;

use App\Entity\Authenticator\Authenticator;
use App\Entity\Authenticator\AuthenticatorInterface;
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
     * @Route("/{type}/new", name="authenticator_new", methods="GET|POST")
     */
    public function new(
        Request $request,
        Project $project,
        string $type,
        AuthenticatorFactory $factory,
        SeleniumAuthenticatorService $seleniumAuthenticator
    ): Response
    {
        $authenticator = $factory->create($type);
        $authenticator->setProject($project);

        $form = $this->createForm($factory->getFormType($type), $authenticator);
        $form->handleRequest($request);
        $cookies = [];

        if ($form->isSubmitted() && $form->isValid()) {

            if ($form->get('save')->isClicked()) {
                $em = $this->getDoctrine()->getManager();
                $em->persist($authenticator);
                $em->flush();

                return $this->redirectToRoute('project_edit', ['project' => $project->getId()]);
            }

            if ($form->get('test')->isClicked()) {
                try {
                    $cookies = $seleniumAuthenticator->resolve($authenticator);
                } catch (\Exception $exception) {
                    $this->addFlash('danger', $exception->getMessage());
                }

                if (!empty($cookies)) {
                    $this->addFlash('success', 'Login finished successfully.');
                }
            }
        }

        return $this->render('pages/authenticator/new.html.twig', [
            'authenticator' => $authenticator,
            'form' => $form->createView(),
            'cookies' => $cookies,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="authenticator_edit", methods="GET|POST")
     */
    public function edit(
        Request $request,
        AuthenticatorInterface $authenticator,
        SeleniumAuthenticatorService $seleniumAuthenticator
    ): Response
    {
        $form = $this->createForm(SeleniumAuthenticatorType::class, $authenticator);
        $form->handleRequest($request);
        $cookies = [];

        if ($form->isSubmitted() && $form->isValid()) {

            if ($form->get('save')->isClicked()) {
                $em = $this->getDoctrine()->getManager();
                $em->persist($authenticator);
                $em->flush();

                return $this->redirectToRoute('project_edit', ['project' => $project->getId()]);
            }

            try {
                $cookies = $seleniumAuthenticator->resolve($authenticator);
            } catch (\Exception $exception) {
                $this->addFlash('danger', $exception->getMessage());
            }

            if (!empty($cookies)) {
                $this->addFlash('success', 'Login finished successfully.');
            }
        }

        return $this->render('pages/authenticator/edit.html.twig', [
            'authenticator' => $authenticator,
            'form' => $form->createView(),
            'cookies' => $cookies,
        ]);
    }

    /**
     * @Route("/{id}", name="authenticator_delete", methods="DELETE")
     */
    public function delete(Request $request, Authenticator $authenticator, Project $project): Response
    {
        if ($this->isCsrfTokenValid('delete' . $authenticator->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($authenticator);
            $em->flush();
        }

        return $this->redirectToRoute('project_edit', ['project' => $project->getId()]);
    }
}
