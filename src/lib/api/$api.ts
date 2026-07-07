import createClient from "openapi-fetch";
import createQueryClient from "openapi-react-query";
import type { paths } from "./schema";

const apiFetchClient = createClient<paths>({
  credentials: "same-origin",
});

export const $api = createQueryClient(apiFetchClient);
