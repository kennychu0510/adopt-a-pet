"use server";

import { Database } from "@/utils/database.types";
import supabase from "@/utils/supabase";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { ENV } from "../../env";

enum TableType {
  Adoption = "Adoption",
  Missing = "Missing",
  ContactUs = "Contact Us",
  Wish = "Wish",
}

function parseError(error: unknown) {
  if (error instanceof Error) {
    return `error: ${error.message}`;
  }
  return "unknown error";
}

export async function onHideItem(
  previousState: any,
  formData: FormData,
): Promise<string> {
  try {
    const id = formData.get("id");
    const table = formData.get("table");
    const show = formData.get("show");
    const token = formData.get("token");

    const idResult = z.number().parse(Number(id));
    const showLiteral = z
      .union([z.literal("true"), z.literal("false")])
      .parse(show);
    const tableResult = z
      .enum([
        TableType.Adoption,
        TableType.Wish,
        TableType.Missing,
        TableType.Wish,
      ])
      .parse(table);
    const showResult = JSON.parse(showLiteral) as boolean;
    const tokenResult = z.string().parse(token);
    jwt.verify(tokenResult, ENV.JWT_SECRET);

    const { error } = await supabase
      .from(tableResult)
      .update({ show: !showResult })
      .eq("id", idResult);
    if (error) throw new Error(error.message);
    return `${showResult ? "Hide" : "Unhide"} item success!`;
  } catch (error) {
    return parseError(error);
  }
}

export async function onDeleteItem(
  previousState: any,
  formData: FormData,
): Promise<string> {
  try {
    const id = formData.get("id");
    const table = formData.get("table");
    const token = formData.get("token");

    const idResult = z.number().parse(Number(id));
    const tableResult = z
      .enum([
        TableType.Adoption,
        TableType.Wish,
        TableType.Missing,
        TableType.Wish,
      ])
      .parse(table);
    const tokenResult = z.string().parse(token);
    jwt.verify(tokenResult, ENV.JWT_SECRET);

    const { error } = await supabase
      .from(tableResult)
      .delete()
      .eq("id", idResult);
    if (error) throw new Error(error.message);
    return `delete item success!`;
  } catch (error) {
    return parseError(error);
  }
}
