alter table "public"."Adoption" drop column "pet_name";

alter table "public"."Adoption" add column "petName" text not null;


