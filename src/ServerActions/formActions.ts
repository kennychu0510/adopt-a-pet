'use server';

// import supabase from "@/utils/supabase";
import services from '@/services';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { ENV } from '../../env';
import { isJWTValid } from './jwtHelper';

enum TableType {
  Adoption = 'Adoption',
  Missing = 'Missing',
  ContactUs = 'Contact Us',
  Wish = 'Wish',
}

function parseError(error: unknown) {
  if (error instanceof Error) {
    return `error: ${error.message}`;
  }
  return 'unknown error';
}

export async function onHideItem(previousState: any, formData: FormData): Promise<string> {
  try {
    const id = formData.get('id');
    const table = formData.get('table');
    const show = formData.get('show');
    const token = formData.get('token');

    const idResult = z.string().parse(id);
    const showLiteral = z.union([z.literal('true'), z.literal('false')]).parse(show);
    const tableResult = z.enum([TableType.Adoption, TableType.Wish, TableType.Missing]).parse(table);
    const showResult = JSON.parse(showLiteral) as boolean;
    const tokenResult = z.string().parse(token);
    const jwtResult = jwt.verify(tokenResult, ENV.JWT_SECRET);
    if (!isJWTValid(jwtResult)) {
      throw new Error('Credentials Expired! Log in again!');
    }

    const { error } = await services.toggleShowItem(tableResult, idResult, showResult);
    if (error) throw new Error('failed to update item');
    return `${showResult ? 'Hide' : 'Unhide'} item success!`;
  } catch (error) {
    return parseError(error);
  }
}

export async function onDeleteItem(previousState: any, formData: FormData): Promise<string> {
  try {
    const id = formData.get('id');
    const table = formData.get('table');
    const token = formData.get('token');

    const idResult = z.string().parse(id);
    const tableResult = z.enum([TableType.Adoption, TableType.Wish, TableType.Missing, TableType.Wish]).parse(table);
    const tokenResult = z.string().parse(token);
    const jwtResult = jwt.verify(tokenResult, ENV.JWT_SECRET);
    if (!isJWTValid(jwtResult)) {
      throw new Error('Credentials Expired! Log in again!');
    }

    await services.deleteItem(tableResult, idResult);
    return `delete item success!`;
  } catch (error) {
    return parseError(error);
  }
}
