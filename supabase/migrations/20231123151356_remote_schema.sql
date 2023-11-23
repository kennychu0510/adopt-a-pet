alter table "public"."Adoption" alter column "description" set default ''::character varying;

alter table "public"."Adoption" alter column "image" set not null;

alter table "public"."Missing" alter column "image" set not null;


