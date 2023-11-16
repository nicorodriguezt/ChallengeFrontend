<?php


namespace challengeBackEnd\Api\Service;

use challengeBackEnd\Api\Model\HotelModel;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class BookingService
{
    private Client $httpClient;

    private const HOTELS_URL = 'https://beta.id90travel.com/api/v1/hotels.json';

    public function __construct()
    {
        $this->httpClient = new Client();
    }

    /**
     * @throws GuzzleException
     */
    public function getHotels($guests, $checkin, $checkout, $destination, $page)
    {
        $params = "?guests[]=$guests&checkin=$checkin&checkout=$checkout&destination=$destination&sort_criteria=Overall&rooms=1&sort_order=desc&per_page=20&page=$page&currency=USD";
        $response = $this->httpClient->request('GET', self::HOTELS_URL . $params);
        $data = json_decode($response->getBody(), true);
        $hotels = [];

        foreach ($data['hotels'] as $hotel) {
            $hotels[] = new HotelModel($hotel);
        }

        return [
            "hotels" => $hotels,
            "currentPage" => $data['meta']['page'],
            "totalPages" => $data['meta']["total_pages"]
        ];
    }
}