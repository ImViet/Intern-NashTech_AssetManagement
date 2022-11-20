const Endpoints = {
  authorize: "api/authorize",
  me: "api/authorize/me",

  user: "api/users",
  userId: (id: number | string): string => `api/users/${id}`,
};

export default Endpoints;
