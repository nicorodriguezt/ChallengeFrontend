<?php


namespace challengeBackEnd\Api\Model;

class UserModel implements \JsonSerializable
{

    private  string $id;
    private string $firstName;
    private string $lastName;
    private string $token;

    public function __construct(array $data)
    {
        $this->id = $data["id"];
        $this->firstName = $data["first_name"];
        $this->lastName = $data["last_name"];
    }

    public function setToken($token) {
        $this->token = $token;
    }

    public function getId() {
        return $this->id;
    }

    public function jsonSerialize()
    {
        return [
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'token' => $this->token
        ];
    }
}