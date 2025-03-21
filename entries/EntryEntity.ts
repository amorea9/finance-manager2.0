export class EntryEntity {
  id: number | undefined;
  constructor(public title: string, public amount: number, public date: string, public paymentMethod: string, public currency: string, public categoryId: number) {}
}
