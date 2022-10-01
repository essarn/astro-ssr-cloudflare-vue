import { resolveHTTPResponse, initTRPC } from "@trpc/server";
import type { APIContext } from "astro";
import type { HTTPHeaders } from "@trpc/client";

const t = initTRPC.create();
const appRouter = t.router({
  test: t.router({
    hello: t.procedure.query(() => "Hello World!"),
  }),
});

export type AppRouter = typeof appRouter;

async function httpHandler({ request, params }: APIContext): Promise<Response> {
  const query = new URL(request.url).searchParams;
  const requestBody = request.method === "GET" ? {} : await request.json();

  const { status, headers, body } = await resolveHTTPResponse({
    createContext: async () => ({}),
    router: appRouter,
    path: params.path as string,
    req: {
      query,
      method: request.method,
      headers: request.headers as unknown as HTTPHeaders,
      body: requestBody,
    },
  });

  return new Response(body, {
    headers: headers as HeadersInit,
    status,
  });
}

export const get = httpHandler;
export const post = httpHandler;
