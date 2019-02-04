export class Account {
  public id: number;
  public name: string;
  public siret: string;
  public address: string;
  public zip_code: number;
  public city: string;
  public country: string;
  public phone: string;
  public fax: string;
  public activity: string;
  public activity_code: string;
  public vat_number: string;

  constructor(id: number,
    name: string,
    siret: string,
    address: string,
    zip_code: number,
    city: string,
    country: string,
    phone: string,
    fax: string,
    activity: string,
    activity_code: string,
    vat_number: string,

  ) {
    this.id = id;
    this.name = name;
    this.siret = siret;
    this.address = address;
    this.zip_code = zip_code;
    this.city = city;
    this.country = country;
    this.phone = phone;
    this.fax = fax;
    this.activity = activity;
    this.activity_code = activity_code;
    this.vat_number = vat_number;
  }
}