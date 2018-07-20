<?php

namespace App\Service\System;

use App\Entity\User;
use App\Entity\UserPreference;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class DateTimeService
{
    private $token;

    public function __construct(TokenStorageInterface $token)
    {
        $this->token = $token;
    }

    public function getDateTimeFormat(): string
    {
        if ($this->token->getToken()) {
            /** @var User $user */
            $user = $this->token->getToken()->getUser();

            if ($user instanceof User && $user->getPreference() && $user->getPreference()->getTimezone()) {
                return $user->getPreference()->getDateFormat() . ' ' . $user->getPreference()->getTimeFormat();
            }
        }

        return UserPreference::DEFAULT_DATE_FORMAT . ' ' . UserPreference::DEFAULT_TIME_FORMAT;
    }
}
