export const getShortEmail = (email: string): string => {
  const atIndex = email.indexOf("@");

  if (atIndex >= 0) {
    const username = email.slice(0, atIndex);
    const truncatedUsername = username.slice(0, 10) + "...";
    const domain = email.slice(atIndex);
    return truncatedUsername + domain;
  }

  return email;
};
