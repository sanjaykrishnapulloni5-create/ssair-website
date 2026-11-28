import { bindings, defineConfig, defineWorker } from "cf/config";
import { createWorkersCacheConfig } from "@vinext/cloudflare/cache/config";

const cache = await createWorkersCacheConfig();

export default defineConfig({
  accountId: "3016fed85823e570a5e53a2f17860e15",
  worker: defineWorker({
    ...cache,
    name: "ssair-website",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-28",
    compatibilityFlags: ["nodejs_compat"],
    observability: {
      enabled: true,
      logs: {
        enabled: true,
        headSamplingRate: 1,
      },
      traces: {
        enabled: true,
        headSamplingRate: 0.05,
      },
    },
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ...cache.env,
      ASSETS: bindings.assets(),
      DB: bindings.d1({
        id: "23406e7c-1e6b-41f2-b7ba-f63b15624165",
        name: "ssair-db",
      }),
    },
  }),
});
