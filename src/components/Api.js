import * as axios from 'axios';


const instance = axios.default.create({
    baseURL: "https://us-central1-login-app-17bed.cloudfunctions.net/api",
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    },
})


export function getURL(url, extraHeaders = {}) {
        return instance.get(url, {
            method: 'GET',
            headers: { ...extraHeaders }
        }
    )   
}

export function postURL(url, data, extraHeaders = {}) {
    return instance.post(url, data, {
        method: 'POST',
        headers: { ...extraHeaders },
    });
}