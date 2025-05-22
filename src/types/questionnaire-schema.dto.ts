export class QuestionnaireSchema {
  items?: Item[];
  resourceType: ResourceType;
  status: Status;
  title: string;
}

export class Item {
  linkId: string;
  text: string;
  type: string;
  [property: string]: any;
}

export enum ResourceType {
  Questionnaire = "Questionnaire",
}

export enum Status {
  Active = "active",
  Draft = "draft",
}
