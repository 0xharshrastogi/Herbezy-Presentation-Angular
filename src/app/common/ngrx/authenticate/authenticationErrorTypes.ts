export class AuthenticationErrorTypes {
	public static jwtTokenNotFound = () => new Error('[Authentication Failed] JWT not found');

	public static jwtTokenInvalidOrExpired = () =>
		new Error('[Authentication Failed] Token is not valid or expired');
}
