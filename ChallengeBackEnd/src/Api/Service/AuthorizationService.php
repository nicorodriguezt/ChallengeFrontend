<?php

namespace challengeBackEnd\Api\Service;

use ReallySimpleJWT\Token;

class AuthorizationService
{

    private const SECRET_KEY = 'sec!ReT423*&';

    public static function getToken($userId)
    {
        return Token::create($userId, self::SECRET_KEY, time() + 999999, "localhost");
    }

    public static function validateToken($token)
    {
        return Token::validate($token, self::SECRET_KEY);
    }

}