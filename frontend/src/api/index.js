import axios from 'axios';

export async function login(data) {
    try {
        delete data.confirm_password;
        const response = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
        }).then(res => res.json());
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function signup(data) {
    try {
        delete data.confirm_password;
        const response = await fetch('http://localhost:3001/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getData(queryParams) {
    try {

        const response = await axios.get('http://localhost:3001/api/data', {
            params: queryParams,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).catch(err => {
            console.log(err, "err")
            alert("Session Expired")
            localStorage.removeItem('token')
            window.location.href = "/"
        });
        return response.data
    } catch (error) {
        console.error('Error:', error);
    }
}