type CookieProps = {
  expires?: number | Date | string;
  [key: string]: any;
};
export function getCookie(name: string): string | undefined {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
  export function setCookie(name: string, value: string | null, props: CookieProps = {}): void {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = props.expires = d;
    }
    if (exp && (exp as Date).toUTCString) {
      props.expires = (exp as Date).toUTCString();
    }
    value = encodeURIComponent(value as string);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
      updatedCookie += '; ' + propName;
      const propValue = props[propName];
      if (propValue !== true) {
        updatedCookie += '=' + propValue;
      }
    }
    document.cookie = updatedCookie;
  }
  
  export function deleteCookie(name: string): void {
    setCookie(name, null, { expires: -1 });
  }

