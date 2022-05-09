// export class Product {
//   public name: string;
//   public description: string;
//   public imgPath: string;

//   constructor(_name: string, _description: string, _imgPath: string) {
//     this.name = _name;
//     this.description = _description;
//     this.imgPath = _imgPath;
//   }
// }

export class Product {
  constructor(
    public imgUrl: string,
    public title: string,
    public price: number,
    public badge: string,
    public category: string
  ) {}
}
