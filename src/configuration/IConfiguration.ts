export interface IConfiguration {
	environment: 'production' | 'development';

	baseUri: {
		[name: string]: string;
	};
}
