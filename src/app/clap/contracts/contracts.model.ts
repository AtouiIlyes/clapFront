export class Contract {
  public id: number;
  public name: string;
  public description: string;
  public client_id: number;
  public sales_person_id: number;
  public manager_id: number;
  public workflow_id: number;

  constructor(id: number,
    name: string,
    description: string,
    client_id: number,
    sales_person_id: number,
    manager_id: number,
    workflow_id: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.client_id = client_id;
    this.sales_person_id = sales_person_id;
    this.manager_id = manager_id;
    this.workflow_id = workflow_id;
  }
}