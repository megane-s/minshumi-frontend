/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable import/no-anonymous-default-export */

export interface Env {
	ORIGIN_SERVER_URL: string
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const reqUrl = new URL(request.url)
		return fetch(`${env.ORIGIN_SERVER_URL}${reqUrl.pathname}${reqUrl.search}`, request)
	},
}
