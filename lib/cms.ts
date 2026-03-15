import { categories, faqs, news, results } from "@/lib/content";

type CmsList<T> = {
  contents: T[];
};

async function fetchMicroCms<T>(endpoint: string): Promise<CmsList<T> | null> {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;

  if (!serviceDomain || !apiKey) {
    return null;
  }

  const response = await fetch(`https://${serviceDomain}.microcms.io/api/v1/${endpoint}`, {
    headers: { "X-MICROCMS-API-KEY": apiKey },
    next: { revalidate: 300 }
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

async function fetchContentful<T>(contentType: string): Promise<T[] | null> {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

  if (!spaceId || !accessToken) {
    return null;
  }

  const response = await fetch(
    `https://cdn.contentful.com/spaces/${spaceId}/entries?access_token=${accessToken}&content_type=${contentType}`,
    { next: { revalidate: 300 } }
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.items?.map((item: { fields: T }) => item.fields) || [];
}

export async function getFaqs() {
  const micro = await fetchMicroCms<typeof faqs[number]>("faq");
  if (micro?.contents?.length) {
    return micro.contents;
  }

  const contentful = await fetchContentful<typeof faqs[number]>("faq");
  return contentful?.length ? contentful : faqs;
}

export async function getNews() {
  const micro = await fetchMicroCms<typeof news[number]>("news");
  if (micro?.contents?.length) {
    return micro.contents;
  }

  const contentful = await fetchContentful<typeof news[number]>("news");
  return contentful?.length ? contentful : news;
}

export async function getResults() {
  const micro = await fetchMicroCms<typeof results[number]>("results");
  if (micro?.contents?.length) {
    return micro.contents;
  }

  const contentful = await fetchContentful<typeof results[number]>("results");
  return contentful?.length ? contentful : results;
}

export async function getCategories() {
  const micro = await fetchMicroCms<typeof categories[number]>("categories");
  if (micro?.contents?.length) {
    return micro.contents;
  }

  const contentful = await fetchContentful<typeof categories[number]>("category");
  return contentful?.length ? contentful : categories;
}
