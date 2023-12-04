'use server';

import supabase from '@/utils/supabase';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

function parseError(error: unknown) {
  if (error instanceof Error) {
    return `error: ${error.message}`
  }
  return 'unknown error'
}

export async function onHideAdoption(previousState: any, formData: FormData): Promise<string> {
  try {
    const id = formData.get('id');
    const show = formData.get('show')
    const idResult = z.number().parse(Number(id));
    const showLiteral = z.union([
      z.literal('true'),
      z.literal('false')
    ]).parse(show)
    const showResult = JSON.parse(showLiteral) as boolean

    const { error } = await supabase.from('Adoption').update({show: !showResult}).eq('id', idResult)
    if (error) throw new Error(error.message);
    return `${showResult ? 'Hide' : 'Unhide'} item success!`
  } catch (error) {
    return parseError(error)
  }
}
