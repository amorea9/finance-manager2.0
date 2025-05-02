export class CreateEntryDto {
  id: number | undefined;
  constructor(public title: string, public amount: string, public date: string, public paymentMethod: string, public currency: string, public categoryId: number) {}
}
