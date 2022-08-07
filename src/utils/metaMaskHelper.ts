function shortenAddress (str: string | null): string {
  if (str === null) return  "";
  return `${str.substr(0, 6)}...${str.substr(-4)}`;
}

export { shortenAddress }