

export class HotelModel {

  name: string;
  checkin: string;
  checkout: string;
  starRating: string;
  total: string;
  image:  string;


  constructor(data: any) {
    this.name= data['name'];
    this.checkin= data['checkin'];
    this.checkout= data['checkout'];
    this.starRating= data['starRating'];
    this.total= data['total'];
    this.image= data['image'];
  }
}
