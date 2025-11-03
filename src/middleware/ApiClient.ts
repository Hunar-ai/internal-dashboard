import Axios from 'axios';
import _ from 'lodash';
import { DataUtils } from 'utils';
import { StringUtils } from 'utils/StringUtils';

// export const ApiClient = {
//     get: <T>(url: string, params?: object) =>
//         axios.get<T>(url, {
//             ...params
//         }),
//     post: <T>(url: string, data: any) => axios.post<T>(url, data, {}),
//     patch: <T>(url: string, data: any) => axios.patch<T>(url, data, {}),
//     delete: <T>(url: string) => axios.delete<T>(url)
// };

const santizeEndpoint = function (
    url: string,
    params: { [key: string]: Record<string, unknown> },
    id: string,
    urlKeys: string[] | null
) {
    let value;
    const urlWithoutQueryParams = urlKeys
        ? urlKeys.reduce((previousValue: any, key: string) => {
              const keyWithoutParenthesis =
                  StringUtils.trimFirstAndLastCharacter(key);
              value = params[keyWithoutParenthesis];
              if (!DataUtils.isEmpty(value)) {
                  return previousValue.replace(key, value);
                  // if value exists in 'params', replce the {key} with actual value
              } else {
                  if (keyWithoutParenthesis === id) {
                      return previousValue.replace(`/${key}`, '');
                      // if key is one of idAttrs, & doesn't exist in params, remove
                      // ideally, either idAttrs, or params will have all keys
                  }
                  throw new Error(`Missing Params: ${keyWithoutParenthesis}`);
              }
          }, url)
        : url;
    return urlWithoutQueryParams;
};

const constructUrlFromQueryParams = function (
    url: string,
    queryParams: Params
) {
    return Object.keys(queryParams).reduce((previousUrl, key, index) => {
        const encodedQueryParam = encodeURIComponent(queryParams[key]);
        if (index === 0) {
            return `${previousUrl}?${key}=${encodedQueryParam}`;
        } else {
            return `${previousUrl}&${key}=${encodedQueryParam}`;
        }
    }, url);
};

const getQueryParamsFromParams = function (
    params: Params,
    urlKeys: string[] | null
) {
    return urlKeys
        ? urlKeys.reduce((previousValue, urlKey) => {
              // omit urlKeys if present in params
              return _.omit(
                  previousValue,
                  StringUtils.trimFirstAndLastCharacter(urlKey)
              );
          }, params)
        : {};
};

const getUrlKeys = function (url: string) {
    const re = new RegExp('{[A-Za-z0-9_]*}', 'g');
    const keys = url.match(re);
    return keys;
};

const santizeUrl = function (
    url: string,
    params = {},
    id: string,
    urlKeys: string[] | null
) {
    const queryParams = getQueryParamsFromParams(params, urlKeys);
    return constructUrlFromQueryParams(
        santizeEndpoint(url, params, id, urlKeys),
        queryParams
    );
};

const getUrl = function (url: string, params: Params) {
    return santizeUrl(url, params, ' 1', getUrlKeys(url));
};

interface Params {
    [key: string]: string;
}

interface ApiModelProps {
    url: string;
}

export const ApiClient = ({ url }: ApiModelProps): any => {
    return {
        post: <T>({
            body,
            params,
            exclude
        }: {
            body: Body;
            params: Params;
            exclude?: string;
        }) => {
            let config = { ...params };

            if (exclude) config = { ...params, exclude };

            return Axios.post<T>(getUrl(url, params), body, {
                ...config
            });
        },
        get: <T>({ params }: { body: Body; params: Params }) => {
            return Axios.get<T>(getUrl(url, params), {
                ...params
            });
        },
        put: <T>({ body, params }: { body: Body; params: Params }) => {
            return Axios.put<T>(getUrl(url, params), body);
        },
        patch: <T>({ body, params }: { body: Body; params: Params }) => {
            return Axios.patch<T>(getUrl(url, params), body);
        },
        delete: <T>({ params }: { params: Params }) => {
            return Axios.delete<T>(getUrl(url, params));
        },
        postForm: <T>({ body, params }: { body: any; params: Params }) => {
            const formData = new FormData();

            for (const name in body) {
                formData.append(_.snakeCase(name), body[name]);
            }

            return Axios.postForm<T>(getUrl(url, params), formData);
        }
    };
};
