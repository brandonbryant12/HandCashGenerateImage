export const sessionOptions = {
  cookieName: "myapp_cookiename",
  password: "complex_password_at_least_32_characters_long",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
