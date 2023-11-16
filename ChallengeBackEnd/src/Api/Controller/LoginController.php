<?php


namespace challengeBackEnd\Api\Controller;


use challengeBackEnd\Api\Service\LoginService;
use GuzzleHttp\Exception\GuzzleException;
use http\Client\Curl\User;
use http\Message\Body;

class LoginController
{

    private LoginService $loginService;

    public function __construct()
    {
        $this->loginService = new LoginService();
    }

    /**
     * @throws GuzzleException
     */
    public function getAirlines()
    {
        return json_encode($this->loginService->getAirlines());
    }

    public function login($airline, $username, $password)
    {
        return json_encode($this->loginService->login($airline,$username,$password));
    }
}