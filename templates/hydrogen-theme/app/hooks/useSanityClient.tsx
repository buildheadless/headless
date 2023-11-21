import { getSanityClient } from "~/lib/sanity/client";
import { useEnvironmentVariables } from "./useEnvironmentVariables";

export function useSanityClient() {
  const env = useEnvironmentVariables();
  const { client } = getSanityClient({
    projectId: env?.SANITY_STUDIO_PROJECT_ID!,
    dataset: env?.SANITY_STUDIO_DATASET!,
    studioUrl: env?.SANITY_STUDIO_URL!,
    useStega: env?.SANITY_STUDIO_USE_STEGA!,
    apiVersion: env?.SANITY_STUDIO_API_VERSION!,
    useCdn: env?.NODE_ENV === "production",
  });

  return client;
}
