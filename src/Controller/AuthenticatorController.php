<?php

namespace App\Controller;

use App\Entity\Authenticator\Authenticator;
use App\Entity\Authenticator\SeleniumAuthenticator;
use App\Entity\Project;
use App\Service\Factory\AuthenticatorFactory;
use App\Service\Selenium\Engine;
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
    private $factory;

    public function __construct(AuthenticatorFactory $factory)
    {
        $this->factory = $factory;
    }

    /**
     * @Route("/{type}/new", name="authenticator_new", methods="GET|POST")
     */
    public function new(
        Request $request,
        Project $project,
        string $type
    ): Response
    {
        $authenticator = $this->factory->create($type);
        $authenticator->setProject($project);

        $form = $this->createForm($this->factory->getFormType($authenticator->getType()), $authenticator);
        $form->handleRequest($request);
        $screenshot = null;

        if ($form->isSubmitted() && $form->isValid() && $form->get('submit')->isClicked()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($authenticator);
            $em->flush();

            return $this->redirectToRoute('authenticator_edit', [
                'project' => $project->getId(),
                'id' => $authenticator->getId(),
            ]);
        }

        return $this->render('pages/authenticator/new.html.twig', [
            'project' => $project,
            'authenticator' => $authenticator,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}/edit", name="authenticator_edit", methods="GET|POST")
     */
    public function edit(
        Request $request,
        Project $project,
        Authenticator $authenticator,
        SeleniumAuthenticatorService $seleniumAuthenticator,
        Engine $engine
    ): Response
    {
        $form = $this->createForm($this->factory->getFormType($authenticator->getType()), $authenticator);
        $form->handleRequest($request);
        $cookies = [];
        $screenshot = null;

        if ($form->isSubmitted() && $form->isValid()) {
            if ($form->get('submit')->isClicked()) {
                $em = $this->getDoctrine()->getManager();
                $em->persist($authenticator);
                $em->flush();

                return $this->redirectToRoute('project_edit', ['project' => $project->getId()]);
            }

            if ($form->get('test')->isClicked() && $authenticator instanceof SeleniumAuthenticator) {
                $driver = $engine->getDriver();
                $seleniumAuthenticator->setDriver($driver);

                try {
                    $cookies = $seleniumAuthenticator->setup($authenticator)->getCookies();
                    $screenshot = $seleniumAuthenticator->getScreenshot();
                } catch (\Exception $exception) {
                    $this->addFlash('danger', $exception->getMessage());
                }

                if (!empty($cookies)) {
                    $this->addFlash('success', 'Login finished successfully.');
                }
            }
        }

        return $this->render('pages/authenticator/edit.html.twig', [
            'project' => $project,
            'authenticator' => $authenticator,
            'form' => $form->createView(),
            'cookies' => $cookies,
            'screenshot' => base64_encode($screenshot),
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
