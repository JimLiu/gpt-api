let bearerTokenSet: Set<string> | null = null;

export const getBearerTokenSet = (): Set<string> => {
  if (!bearerTokenSet) {
    const tokensString = process.env.BEARER_TOKENS || "";
    const tokens = tokensString
      .split(",")
      .map((token) => token.trim())
      .filter((token) => token.length > 0);

    bearerTokenSet = new Set(tokens);
  }
  return bearerTokenSet;
};
