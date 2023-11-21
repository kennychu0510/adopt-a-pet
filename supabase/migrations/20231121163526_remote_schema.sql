alter table "public"."Missing" add column "contact" text not null;

alter table "public"."Missing" add column "lastSeen" timestamp with time zone not null;

alter table "public"."Missing" add column "lat" numeric not null;

alter table "public"."Missing" add column "lng" numeric not null;

alter table "public"."Missing" add column "petName" text not null;


