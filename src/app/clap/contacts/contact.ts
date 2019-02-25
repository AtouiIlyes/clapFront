export class Contact {
  public id: number;
  public email: string;
  public first_name: string;
  public last_name: string;
  public role_id: number;
  public type_id: number;
  public function1: string;
  public address_one: string;
  public address_two: string;
  public zip_code: number;
  public city: string;
  public phone: string;
  public fax: string;

  constructor(id: number,
    email: string,
    role_id: number,
    first_name: string,
    last_name: string,
    type_id: number,
    function1: string,
    address_one: string,
    address_two: string,
    zip_code: number,
    city: string,
    phone: string,
    fax: string,

  ) {
    this.id = id;
    this.email = email;
    this.role_id = role_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.type_id = type_id;
    this.function1 = function1;
    this.address_one = address_one;
    this.address_two = address_two;
    this.zip_code = zip_code;
    this.city = city;
    this.phone = phone;
    this.fax = fax;
  }
}