<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\Install\CreateAdminType;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\BufferedOutput;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\KernelInterface;

class InstallController extends Controller
{
    private $manager;

    public function __construct(EntityManagerInterface $manager)
    {
        $this->manager = $manager;
    }

    /**
     * @Route(path="/install", name="install")
     */
    public function install(Request $request, KernelInterface $kernel)
    {
        $user = null;

        try {
            $user = $this->manager->getRepository(User::class)->findAll();
        } catch (\Exception $exception) {

        }

        if ($user) {
            throw new AccessDeniedHttpException('Application has already been installed.');
        }

        $form = $this->createForm(CreateAdminType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();

            $this->migrate($kernel);
            $this->createAdmin($data);

            $this->addFlash('success', sprintf('Created new admin user: %s', $data['email']));

            return $this->redirectToRoute('fos_user_security_login');
        }

        return $this->render('pages/install/install.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @param KernelInterface $kernel
     * @return string
     * @throws \Exception
     */
    private function migrate(KernelInterface $kernel)
    {
        $application = new Application($kernel);
        $application->setAutoExit(false);

        $input = new ArrayInput([
            'command' => 'doctrine:migrations:migrate',
        ]);

        $output = new BufferedOutput();
        $application->run($input, $output);

        return $output->fetch();
    }

    private function createAdmin(array $data)
    {
        $user = new User();
        $user->setUsername($data['username']);
        $user->setEmail($data['email']);
        $user->setPlainPassword($data['password']);
        $user->addRole(User::ROLE_ADMIN);
        $user->setEnabled(true);

        $this->manager->persist($user);
        $this->manager->flush();
    }
}
