import md5 from 'md5';

export const buildAvatarUrl = email => {
  const formattedEmail = ('' + email).trim().toLowerCase();
  const hash = md5(formattedEmail);
  return `//www.gravatar.com/avatar/${hash}.jpg`;
};