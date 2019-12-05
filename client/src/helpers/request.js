export const getAuthToken = () => {
	return localStorage.getItem('jwt_token') || sessionStorage.getItem('jwt_token');
};

export const getDefaultHeaders = () => {
	return {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + getAuthToken()
	};
};

export default function(route, method = "GET", data, headers = getDefaultHeaders(), stringifyData = true) {
	data = stringifyData ? JSON.stringify(data) : data;

	return fetch(route, {
		method: method,
		headers: headers,
		body: data
	})
		.then(res => {
			return res;
		})
};
