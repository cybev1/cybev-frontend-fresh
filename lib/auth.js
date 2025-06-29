export const setLoginSession = (res, session) => {
  const cookie = `session=${JSON.stringify(session)}; Path=/; HttpOnly; Secure`;
  res.setHeader('Set-Cookie', cookie);
};
