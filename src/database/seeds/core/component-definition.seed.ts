import path from "path";
import { promises as fs } from "fs";
import { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { ComponentDefinition } from "@modules/study-definition/entities/component-definition";
import { ComponentType } from "@modules/study-definition/enum/component-type";

const componentSeedConfig: Record<
  string,
  {
    type: ComponentType;
    title: string;
  }
> = {
  informational: {
    type: ComponentType.INFORMATIONAL,
    title: "Daily Informational",
  },
  questionnaire: {
    type: ComponentType.QUESTIONNAIRE,
    title: "Heart Health Questionnaire",
  },
  "health-data-collection": {
    type: ComponentType.HEALTH_DATA_COLLECTION,
    title: "HealthKit Data Collection",
  },
};

export class ComponentDefinitionSeed extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const now = new Date();
    const schemaRoot = path.resolve(__dirname, "../../../schemas/json");

    const folders = await fs.readdir(schemaRoot);

    for (const folder of folders) {
      const folderPath = path.join(schemaRoot, folder);
      const stat = await fs.stat(folderPath);
      if (!stat.isDirectory()) continue;

      const config = componentSeedConfig[folder];
      if (!config) {
        console.warn(`Skipping unknown folder: ${folder}`);
        continue;
      }

      const { type, title } = config;

      const files = await fs.readdir(folderPath);
      for (const file of files.filter((f) => f.endsWith(".json"))) {
        const version = file.replace(".json", "");

        const existing = await em.findOne(ComponentDefinition, {
          type,
          schemaVersion: version,
        });

        if (existing) {
          console.log(`Skipping existing: ${type} v${version}`);
          continue;
        }

        const schemaPath = path.join(folderPath, file);
        const raw = await fs.readFile(schemaPath, "utf-8");
        const schema = JSON.parse(raw) as Record<string, any>;

        const component = em.create(ComponentDefinition, {
          type,
          title,
          schemaVersion: version,
          schema,
          createdAt: now,
          updatedAt: now,
        });

        em.persist(component);
        console.log(`Seeded: ${type} v${version}`);
      }
    }

    await em.flush();
  }
}
