import { getBearerTokenSet } from "./env";

export const isAuthed = (authorization: string | undefined) => {
  const tokenSet = getBearerTokenSet();

  // If no token is required, then all requests are authorized
  if (!tokenSet.size) {
    return true;
  }

  const token = authorization?.match(/Bearer ([^\s]+)/)?.[1];

  if (!token) {
    return false;
  }

  return tokenSet.has(token.trim());
};
