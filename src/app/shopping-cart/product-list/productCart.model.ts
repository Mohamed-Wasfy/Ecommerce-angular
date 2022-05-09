export class ProductCart {
  constructor(
    public id: string,
    public imgUrl: string,
    public title: string,
    public price: number,
    public quantity: number,
    public size: string,
    public color: string,
    public totalPrice: number = price * quantity
  ) {}
}
