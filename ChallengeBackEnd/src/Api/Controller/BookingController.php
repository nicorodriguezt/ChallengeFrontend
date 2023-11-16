<?php

namespace challengeBackEnd\Api\Controller;


use challengeBackEnd\Api\Service\BookingService;
use GuzzleHttp\Exception\GuzzleException;

class BookingController
{

    private BookingService $bookingService;

    public function __construct()
    {
        $this->bookingService = new BookingService();
    }

    /**
     * @throws GuzzleException
     */
    public function getHotels($guests, $checkin, $checkout, $destination, $page)
    {
        return json_encode($this->bookingService->getHotels($guests, $checkin, $checkout, $destination, $page));
    }
}