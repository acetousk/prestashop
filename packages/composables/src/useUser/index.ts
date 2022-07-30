import {Context, Logger, useUserFactory, UseUserFactoryParams} from '@vue-storefront/core';
import type { User } from '@vue-storefront/moqui-api';
import type {UseUserUpdateParams as UpdateParams, UseUserRegisterParams as RegisterParams} from '../types';
import {handleRequest} from '../helpers';
// import {useBootstrap} from '../useBootstrap';

const params: UseUserFactoryParams<any, UpdateParams, RegisterParams> = {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context) => {
    let data;
    try {
      data = await handleRequest(context, {method: 'get', url: '/accountInfo'});

      if (data?.errorCode) {
        throw { message: data?.errors ? data?.errors : 'User load failed' };
        return null;
      }

      return data?.psdata;

    } catch (error) {
      Logger.debug('useUser load error.message: ' + JSON.stringify(error.message));
      return data?.psdata;
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logOut: async (context: Context) => {
    await handleRequest(context, {method: 'get', url: '/logout'});

    context.$moqui.config.app.$cookies.remove(context.$moqui.config.app.$config.psCustomerCookieKey);
    context.$moqui.config.app.$cookies.remove(context.$moqui.config.app.$config.psCustomerCookieValue);
    context.$moqui.config.app.$cookies.remove('moquiSessionToken');

    // After logout, remove cookies because it'll invalidate the session and call lightBootstrap to send store and get cookies.
    await handleRequest(context, {method: 'get',
      url: '/lightbootstrap',
      params: {
        // eslint-disable-next-line camelcase
        menu_with_images: 'single',
        requestHostName: context.req?.headers?.host,
        productStoreId: context.$moqui.config.app.$config.productStoreId
      }
    });

    // const test = context;
    //
    // Logger.error('load typeof test ' + JSON.stringify(typeof test));
    // Logger.error('load Object.getOwnPropertyNames(test) ' + JSON.stringify(Object.getOwnPropertyNames(test)));
    // Logger.error('load test ' + JSON.stringify(test));
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser: async (context: Context, { currentUser, updatedUserData }) => {
    const data = await handleRequest(context, {method: 'post',
      url: '/accountedit',
      data: updatedUserData
    });

    const data2 = await handleRequest(context, {method: 'get', url: '/accountInfo'});

    if (data?.errors) throw { message: data?.errors ? data?.errors : 'Update User failed' };
    if (data?.psdata?.message && !data2?.psdata?.message) data2.psdata.message = data?.psdata?.message;

    return data2.psdata;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: async (context: Context, { email, password, firstName, lastName }) => {
    const data = await handleRequest(context, {method: 'post',
      url: '/register',
      data: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
      }
    });

    if (data?.errors) {
      throw { message: data?.errors ? data?.errors : 'Registration failed' };
    }

    const code = data?.code;
    if (code === 200) {
      const data: any = await handleRequest(context, {method: 'get', url: '/accountInfo'});

      if (data.code === 410) return {};
      return data.psdata;
    } else if (code === 306) {
    }

    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logIn: async (context: Context, { username, password }) => {
    const data = await handleRequest(context, {method: 'post',
      url: '/login',
      data: {
        email: username,
        password: password
      }
    });

    if (data?.errorCode) throw { message: data?.errors ? data?.errors : 'The provided credentials are invalid' };

    return data.psdata.user;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePassword: async (context: Context, { currentUser, currentPassword, newPassword, customQuery }) => {
    const updatedUserData = {
      password: currentPassword,
      // eslint-disable-next-line camelcase
      new_password: newPassword,
      ...customQuery
    };
    const data = await handleRequest(context, {method: 'post',
      url: '/accountedit',
      data: updatedUserData
    });

    const data2: any = await handleRequest(context, {method: 'get', url: '/accountInfo'});

    if (data?.errors) throw { message: data?.errors ? data?.errors : 'It was not possible to update your password.' };
    if (data?.psdata?.message && !data2?.psdata?.message) data2.psdata.message = data?.psdata?.message;

    return data2.psdata;
  }
};

export const useUser = useUserFactory<User, UpdateParams, RegisterParams>(params);
