
import Cookies from 'universal-cookie';

const cookie = new Cookies();

class CookieService {

  get(key){
     return cookie.get(key);
  }

  set(key, value, option){
      cookie.set(key, value, option);
  }

  remove(key){
     cookie.remove(key);
  }

}

export default new CookieService();
