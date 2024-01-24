import createClient from "openapi-fetch";
import "server-only";
import { paths } from "./generated/search";

export const searchApiClient = createClient<paths>({
    baseUrl: process.env.SEARCH_SERVER,
})
