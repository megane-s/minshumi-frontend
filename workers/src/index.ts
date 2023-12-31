/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable import/no-anonymous-default-export */

export interface Env {
	ORIGIN_SERVER_URL: string
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const requestUrl = new URL(request.url)
		const originServerUrl = new URL(env.ORIGIN_SERVER_URL)
		originServerUrl.pathname = requestUrl.pathname
		originServerUrl.search = requestUrl.search
		originServerUrl.hash = requestUrl.hash
		const originServerRes = await fetch(originServerUrl)
		return originServerRes
	},
}
