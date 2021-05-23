import axios from 'axios';
import Cookies from 'js-cookie';


const refresh = refreshToken => {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost/8000/refresh', { token: refreshToken } ).then(res => {
            if (res.data.error) resolve(false);
            else {
                const { accessToken } = res.data;
                Cookies.set('access', accessToken);
                resolve(accessToken);
            }
        })

    })
}

const requestLogin = async (accessToken, refreshToken) => {
    return new Promise ((resolve, reject) => {
        axios.post('http://localhost:8000//protected', {}, { headers: { "authorization" : `Bearer ${accessToken}` }}).then( async res => {
            if(res.data.error == 'User not authenticated') return 'Invalid'
            else if( res.data.error == 'Access Token expired' ) {
                const accessToken = await refresh(refreshToken);
                return await requestLogin(accessToken, refreshToken);
            }else resolve(true)
        })
    })
}

const hasAccess = async (accessToken, refreshToken) => {
      if(!refreshToken) return null;

      if(accessToken === undefined) {
          accessToken = await refresh(refreshToken);
          return accessToken;
      }

      return accessToken;
}

export const protect = async () => {
    let accessToken = Cookies.get('access');
    let refreshToken = Cookies.get('refresh');

    accessToken = await hasAccess(accessToken, refreshToken);

    if(!accessToken) return 'Invalid'
    else await requestLogin(accessToken, refreshToken)

}