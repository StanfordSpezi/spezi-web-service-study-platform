import { Migration } from '@mikro-orm/migrations';

export class Migration20250611025959 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "component_definition" ("id" uuid not null default gen_random_uuid(), "type" text check ("type" in ('healthDataCollection', 'questionnaire', 'informational')) not null, "schema_version" varchar(255) not null, "title" varchar(255) not null, "schema" jsonb not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "component_definition_pkey" primary key ("id"));`);
    this.addSql(`alter table "component_definition" add constraint "component_definition_type_schema_version_unique" unique ("type", "schema_version");`);

    this.addSql(`create table "study_definition" ("id" uuid not null default gen_random_uuid(), "schema_version" varchar(255) not null, "title" varchar(255) not null, "short_title" varchar(255) not null, "explanation_text" varchar(255) not null, "short_explanation_text" varchar(255) not null, "icon_symbol" varchar(255) not null, constraint "study_definition_pkey" primary key ("id"));`);

    this.addSql(`create table "participation_criteria" ("id" uuid not null default gen_random_uuid(), "study_definition_id" uuid not null, "type" text check ("type" in ('ageAtLeast', 'isFromRegion')) not null, "value" varchar(255) not null, "grouping" text check ("grouping" in ('all', 'any')) not null, "parent_id" uuid null, constraint "participation_criteria_pkey" primary key ("id"));`);

    this.addSql(`create table "enrollment_condition" ("id" uuid not null default gen_random_uuid(), "study_definition_id" uuid not null, "requires_invite" boolean not null, "invite_url" varchar(255) null, constraint "enrollment_condition_pkey" primary key ("id"));`);
    this.addSql(`alter table "enrollment_condition" add constraint "enrollment_condition_study_definition_id_unique" unique ("study_definition_id");`);

    this.addSql(`create table "component_instance" ("id" uuid not null default gen_random_uuid(), "study_definition_id" uuid not null, "component_definition_id" uuid not null, "details" jsonb not null, "display_order" int not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "component_instance_pkey" primary key ("id"));`);

    this.addSql(`create table "component_schedule" ("id" uuid not null default gen_random_uuid(), "component_instance_id" uuid not null, "completion_policy" varchar(255) not null, "start_offset_days" int not null, "repeat_metadata" jsonb not null, constraint "component_schedule_pkey" primary key ("id"));`);
    this.addSql(`alter table "component_schedule" add constraint "component_schedule_component_instance_id_unique" unique ("component_instance_id");`);

    this.addSql(`alter table "participation_criteria" add constraint "participation_criteria_study_definition_id_foreign" foreign key ("study_definition_id") references "study_definition" ("id") on update cascade;`);
    this.addSql(`alter table "participation_criteria" add constraint "participation_criteria_parent_id_foreign" foreign key ("parent_id") references "participation_criteria" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "enrollment_condition" add constraint "enrollment_condition_study_definition_id_foreign" foreign key ("study_definition_id") references "study_definition" ("id") on update cascade;`);

    this.addSql(`alter table "component_instance" add constraint "component_instance_study_definition_id_foreign" foreign key ("study_definition_id") references "study_definition" ("id") on update cascade;`);
    this.addSql(`alter table "component_instance" add constraint "component_instance_component_definition_id_foreign" foreign key ("component_definition_id") references "component_definition" ("id") on update cascade;`);

    this.addSql(`alter table "component_schedule" add constraint "component_schedule_component_instance_id_foreign" foreign key ("component_instance_id") references "component_instance" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "component_instance" drop constraint "component_instance_component_definition_id_foreign";`);

    this.addSql(`alter table "participation_criteria" drop constraint "participation_criteria_study_definition_id_foreign";`);

    this.addSql(`alter table "enrollment_condition" drop constraint "enrollment_condition_study_definition_id_foreign";`);

    this.addSql(`alter table "component_instance" drop constraint "component_instance_study_definition_id_foreign";`);

    this.addSql(`alter table "participation_criteria" drop constraint "participation_criteria_parent_id_foreign";`);

    this.addSql(`alter table "component_schedule" drop constraint "component_schedule_component_instance_id_foreign";`);

    this.addSql(`drop table if exists "component_definition" cascade;`);

    this.addSql(`drop table if exists "study_definition" cascade;`);

    this.addSql(`drop table if exists "participation_criteria" cascade;`);

    this.addSql(`drop table if exists "enrollment_condition" cascade;`);

    this.addSql(`drop table if exists "component_instance" cascade;`);

    this.addSql(`drop table if exists "component_schedule" cascade;`);
  }

}
