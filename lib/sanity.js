import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "oapqaaam",
  dataset: "production",
  token: process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN,
  useCdn: false,
  apiVersion: "2021-08-31",
});
