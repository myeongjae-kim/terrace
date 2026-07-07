import { zValidator } from "@hono/zod-validator";

type ValidatorSchema = Parameters<typeof zValidator>[1];

export function validateQuery<T extends ValidatorSchema>(schema: T) {
  return zValidator("query", schema, (result, c) => {
    if (result.success) {
      return;
    }

    return c.json({ message: "Invalid query parameters" }, 400);
  });
}

export function validateParams<T extends ValidatorSchema>(schema: T) {
  return zValidator("param", schema, (result, c) => {
    if (result.success) {
      return;
    }

    return c.json({ message: "Invalid path parameters" }, 400);
  });
}
