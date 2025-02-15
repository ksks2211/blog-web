import { useEffect, useRef } from "react";

const giscusRepoId = import.meta.env.VITE_GISCUS_REPO_ID;
const giscusCategoryId = import.meta.env.VITE_GISCUS_CATEGORY_ID;

const config = {
  src: "https://giscus.app/client.js",
  "data-repo": "ksks2211/utterances",
  "data-repo-id": giscusRepoId,
  "data-category": "Announcements",
  "data-category-id": giscusCategoryId,
  "data-mapping": "pathname",
  "data-strict": "0",
  "data-reactions-enabled": "1",
  "data-emit-metadata": "0",
  "data-input-position": "top",
  "data-theme": "light",
  "data-lang": "en",
  "data-loading": "lazy",
  crossOrigin: "anonymous",
  async: true,
};

function GiscusComments({ postId }: { postId: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");

    Object.entries(config).forEach(([key, value]) => {
      script.setAttribute(key, value as string);
    });

    const container = ref.current;

    if (container?.childNodes.length === 0) {
      container?.append(script);
    }

    return () => {
      script.remove();

      if (container) {
        container.innerHTML = "";
      }
    };
  }, [postId]);

  return <div ref={ref} className="mt-10" />;
}

export default GiscusComments;
