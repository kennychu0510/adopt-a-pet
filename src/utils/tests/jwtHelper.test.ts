import { describe, test, expect } from "vitest";
import { isJWTValid } from "../../ServerActions/jwtHelper";
import jwt from 'jsonwebtoken'

const secret = 'jwtsecret'

describe('jwt helper test', () => {
  test('expiry date checker is correct 1', () => {
    const payload = {
      expire: new Date().getTime() - 1
    }
    const token = jwt.sign(payload, secret)
    const result = jwt.decode(token)
    
    expect(isJWTValid(result)).toBe(false)
  })
  test('expiry date checker is correct 2', () => {
    const payload = {
      expire: new Date().getTime() + 1
    }
    const token = jwt.sign(payload, secret)
    const result = jwt.decode(token)
    
    expect(isJWTValid(result)).toBe(true)
  })
})