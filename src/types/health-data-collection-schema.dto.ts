export class HealthDataCollectionSchema {
  collectionWindowDays: number;
  expectedTypes: string[];
  sampling?: Sampling;
}

export enum Sampling {
  Daily = "daily",
  Hourly = "hourly",
  OnEvent = "onEvent",
}
