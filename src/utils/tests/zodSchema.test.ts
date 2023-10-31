import { describe, test, expect } from 'vitest';
import { AdoptionSchema } from '../ZodSchema';

describe('zod schema', () => {
  test('Adoption Schema', () => {
    expect(
      AdoptionSchema.parse({
        name: 'john',
        type: 'dog',
        image: undefined,
        description: 'golden retriever',
        contact: 'john@gmail.com',
      })
    ).toBeTruthy();

    expect(() =>
      AdoptionSchema.parse({
        name: 'john',
        type: 'something',
        image: undefined,
        description: 'golden retriever',
        contact: 'john@gmail.com',
      })
    ).toThrowError();
  });
});
