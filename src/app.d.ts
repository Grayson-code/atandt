// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		export interface User {
			uid: string;
			email: string;
			emailVerified: boolean;
			displayName: string;
			isAnonymous: boolean;
			photoURL: string;
			providerData: ProviderDatum[];
			stsTokenManager: StsTokenManager;
			createdAt: string;
			lastLoginAt: string;
			apiKey: string;
			appName: string;
		}

		export interface ProviderDatum {
			providerId: string;
			uid: string;
			displayName: string;
			email: string;
			phoneNumber: null;
			photoURL: string;
		}

		export interface StsTokenManager {
			refreshToken: string;
			accessToken: string;
			expirationTime: number;
		}
		export interface EventsDocument {
			of: string;
			deadline: number;
			type: string;
			name: string;
			author: string;
		}

		export interface Event {
			id: string;
			author: string;
			deadline: number;
			name: string;
			of: string;
			priorityOverride: number;
			special: {
			  content: string;
			  type: string;
			};
			type: "note" | "assignment" | "tp" | "event";
		  };

		export interface Worklog {
			event: Event;
			start: number;
			end: number;

	}
}

export { };
