alter table "public"."Adoption" add column "show" boolean not null default true;

alter table "public"."Adoption" alter column "description" set not null;

alter table "public"."Missing" add column "show" boolean not null default true;

alter table "public"."Wish" add column "show" boolean not null default true;


