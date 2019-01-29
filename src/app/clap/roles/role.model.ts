export class Role {
  public id: number;
  public name: string;
  public description: string;
  permission_ids: Array<any>;

  constructor(id: number,
    name: string,
    permission_ids: Array<any>,
    description: string
  ) {
    this.id = id;
    this.name = name;
    this.permission_ids = permission_ids;
    this.description = description;
  }
}
