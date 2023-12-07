export function isJWTValid(token: any): boolean {
  if (!token) return false;
  const expiryTimestamp = token.expire;
  if (!expiryTimestamp) return false;

  const todayTimestamp = new Date().getTime();
  return expiryTimestamp < todayTimestamp ? false : true;
}
