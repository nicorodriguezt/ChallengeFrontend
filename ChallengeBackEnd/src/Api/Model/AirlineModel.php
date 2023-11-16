<?php

namespace challengeBackEnd\Api\Model;

class AirlineModel implements \JsonSerializable
{
    private String $name;

    public function __construct(array $data)
    {
        $this->name = $data["name"];
    }

    public function getAirline() {
        return $this->name;
    }

    public function jsonSerialize()
    {
        return $this->name;
    }
}