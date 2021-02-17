/***
 *                    _     _              _
 *      /\           (_)   | |            | |
 *     /  \   ___ ___ _ ___| |_ __ _ _ __ | |_
 *    / /\ \ / __/ __| / __| __/ _` | '_ \| __|
 *   / ____ \\__ \__ \ \__ \ || (_| | | | | |_
 *  /_/    \_\___/___/_|___/\__\__,_|_| |_|\__|
 *
 * Copyright (C) 2020 Bavfalcon9
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.
 */
import { OAuthAccessMap, OAuthGrantResponse, OAuthOptions } from "../../mod.ts";

export default class Client {
	#tokens: Partial<OAuthAccessMap> = {};
	#scopes: string[] = [];
	#options: OAuthOptions;
	#data: any;
	#authenticated: boolean;

	public constructor(options: OAuthOptions) {
		this.#options = options;
		this.#data = {};
		this.#authenticated = false;
	}

	/**
	 * This should be called when you recieve the information from the server on redirect.
	 */
	public async accept_grant(grants: OAuthGrantResponse) {
		this.#tokens.refresh = grants.refresh_token;
		this.#tokens.token = grants.access_token;
		this.#tokens.type = grants.token_type;
		this.#tokens.scopes = grants.scope?.split(' ');
		this.#scopes = grants.scope?.split(' ') || [];
		this.#authenticated;

		if (this.#options.expires) {
			// to do: Handle expires.
		}
	}

	public async refresh(): Promise<boolean> {
		if (this.#authenticated) {
			return true;
		}
		return false;
	}

	/**
	 * Whether or not you can access this scope.
	 */
	public can(scope: string): boolean {
		return this.#scopes.includes(scope);
	}
}