import { useEffect } from "react";

type PageMetadata = {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
};

const upsertMeta = (attr: "name" | "property", key: string, content: string) => {
  let element = document.head.querySelector(`meta[${attr}='${key}']`) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

export const usePageMetadata = ({ title, description, image, type = "website" }: PageMetadata) => {
  useEffect(() => {
    const fullTitle = `${title} | CopyArabia`;
    const canonical = window.location.href;

    document.title = fullTitle;
    upsertMeta("name", "description", description);

    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:site_name", "CopyArabia");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);

    if (image) {
      upsertMeta("property", "og:image", image);
      upsertMeta("name", "twitter:image", image);
    }
  }, [description, image, title, type]);
};
