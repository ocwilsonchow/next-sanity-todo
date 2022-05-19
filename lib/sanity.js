import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "oapqaaam",
  dataset: "production",
  useCdn: false,
  apiVersion: '2021-08-31'
});
