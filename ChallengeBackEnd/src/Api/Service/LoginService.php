<?php


namespace challengeBackEnd\Api\Service;

use challengeBackEnd\Api\Model\AirlineModel;
use challengeBackEnd\Api\Model\UserModel;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class LoginService
{
    private Client $httpClient;

    private const LOGIN_URL = 'https://beta.id90travel.com/session.json';
    private const AIRLINES_URL = 'https://beta.id90travel.com/airlines';

    public function __construct()
    {
        $this->httpClient = new Client();
    }

    /**
     * @throws GuzzleException
     */
    public function getAirlines()
    {
        $response = $this->httpClient->request('GET',self::AIRLINES_URL);
        $data = json_decode($response->getBody(), true);
        $airlines = [];

        foreach ($data as $airline) {
            $airlines[] = new AirlineModel($airline);
        }

        return $airlines;
    }

    /**
     * @throws GuzzleException
     */
    public function login(String $airline, String $username, String $password) {
        $headers = ['Content-Type'     => 'application/json'];
        $body = [
            'airline'  => $airline,
            'username' => $username,
            'password' => $password,
        ];
        try {
            $response = $this->httpClient->request('POST', self::LOGIN_URL,
                ['headers' => $headers,
                    'json' => $body]);
        } catch (GuzzleException $exception) {
            throw  new \Exception("loginError");
        }
        $data = json_decode($response->getBody(), true)["member"];
        $user = new UserModel($data);
        $_SESSION['loggedUser'] = $user->getId();
        $token = AuthorizationService::getToken($_SESSION['loggedUser']);
        $user->setToken($token);
        return $user;
    }
}