import { component$ } from "@builder.io/qwik";
import { DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { TenantRepository } from "@mfmt/cms";
import Blocks from "~/blocks/Blocks";

export const useTheme = routeLoader$(async (requestEvent) => {
  const host = requestEvent.url.hostname;
  const repo = TenantRepository(host);
  return `/themes/${await repo?.getSlug()}.css`;
});

export const useResult = routeLoader$(async (requestEvent) => {
  // This code runs only on the server, after every navigation
  const host = requestEvent.url.hostname;
  const repo = TenantRepository(host);
  const path = `${requestEvent.url.pathname}`;
  const result = await repo?.getPage(path);

  if (!result) {
    requestEvent.status(404);
  }
  return result;
});

export default component$(() => {
  const theme = useTheme();
  const result = useResult();

  if (!result.value) {
    return <h1>Not found 🤷‍♂️</h1>;
  }

  const tenant = {
    slug: "tenant_one",
  };

  return (
    <>
      <link rel="stylesheet" href={theme.value} />
      <h1>{result.value.page.title}</h1>

      <Blocks
        value={result.value.page.blocks}
        tenant={tenant}
        context={result.value.context}
      />
    </>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const result = resolveValue(useResult);
  return {
    title: result?.page.title ?? "",
    meta: [
      {
        name: "description",
        content: "Qwik site description",
      },
    ],
  };
};
