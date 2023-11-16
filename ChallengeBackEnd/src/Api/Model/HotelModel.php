<?php


namespace challengeBackEnd\Api\Model;

class HotelModel implements \JsonSerializable
{
    private String $name;
    private String $checkin;
    private String $checkout;
    private String $starRating;

    private String $total;

    private String $image;

    public function __construct(array $data)
    {
        $this->name = $data["name"];
        $this->checkin = $data["checkin"];
        $this->checkout = $data["checkout"];
        $this->starRating= $data["star_rating"];
        $this->total = $data["total"];
        $this->image = substr($data['image'], 2);
    }

    public function jsonSerialize()
    {
        return [
            'name' => $this->name,
            'checkin' => $this->checkin,
            'checkout' => $this->checkout,
            'starRating' => $this->starRating,
            'total' => $this->total,
            'image' => $this->image,
        ];
    }
}