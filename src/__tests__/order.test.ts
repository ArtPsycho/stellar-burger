// orderBurgerApi
import {
  orderReset,
  getBurger,
  reducerOrder
} from '../services/slices/orderSlice';
import { TNewOrderResponse } from '../utils/burger-api';
import { order } from '../utils/testData';

describe('Проверка синхронных экшенов отправки заказа', () => {
  test('Очистка заказа', () => {
    const initialState = {
      feed: null,
      orderData: [],
      orderRequest: false,
      orderModalData: order,
      isLoading: false,
      error: null
    };
    
    const newState = reducerOrder(initialState, orderReset());

    expect(newState).toEqual({
      feed: null,
      orderData: [],
      orderRequest: false,
      orderModalData: null,
      isLoading: false,
      error: null
    });
  });
});

describe('Проверка асинхронных экшенов отправки заказа', () => {
  test('Проверка getBurger.pending', async () => {
    const initialState = {
      feed: null,
      orderData: [],
      orderRequest: false,
      orderModalData: order,
      isLoading: false,
      error: null
    };

    const newState = reducerOrder(
      initialState,
      getBurger.pending('pending', [])
    );

    expect(newState.isLoading).toBeTruthy;
    expect(newState.error).toBeNull;
  });

  test('Проверка getBurger.rejected', async () => {
    const initialState = {
      feed: null,
      orderData: [],
      orderRequest: false,
      orderModalData: order,
      isLoading: false,
      error: null
    };

    const error: Error = {
      name: 'rejected',
      message: 'Ошибка отправки заказа'
    };

    const newState = reducerOrder(
      initialState,
      getBurger.rejected(error, 'rejected', [])
    );

    expect(newState.isLoading).toBeFalsy;
    expect(newState.error).toEqual(error.message);
  });

  test('Проверка getBurger.fulfilled', async () => {
    const initialState = {
      feed: null,
      orderData: [],
      orderRequest: false,
      orderModalData: order,
      isLoading: false,
      error: null
    };

    const newOrder: TNewOrderResponse = {
      order: order,
      name: 'some order',
      success: true
    };

    const newState = reducerOrder(
      initialState,
      getBurger.fulfilled(newOrder, 'fulfilled', [])
    );

    expect(newState.orderModalData).toEqual(order);
    expect(newState.error).toBeNull;
    expect(newState.isLoading).toBeFalsy;
  });
});


// // getFeedApi

// reducerOrder
import { getFeeds, TOrderState } from '../services/slices/orderSlice';
import { TFeedsResponse } from '../utils/burger-api';
import { userOrders } from '../utils/testData';

describe('Проверка асинхронных экшенов получения общего списка заказов', () => {
  test('Проверка getFeeds.pending', async () => {
    const initialState: TOrderState = {
      feed: {
        orders: userOrders,
        total: 3,
        totalToday: 2,
      },
      orderData: [],
      orderRequest: false,
      orderModalData: null,
      isLoading: false,
      error: null
    };


    const newState = reducerOrder(
      initialState,
      getFeeds.pending('pending')
    );

    expect(newState.isLoading).toBeTruthy;
    expect(newState.error).toBeNull;
  });

  test('Проверка getFeeds.rejected', async () => {
    const initialState: TOrderState = {
      feed: {
        orders: userOrders,
        total: 3,
        totalToday: 2,
      },
      orderData: [],
      orderRequest: false,
      orderModalData: null,
      isLoading: false,
      error: null
    };

    const error: Error = {
      name: 'rejected',
      message: 'Ошибка получения списка заказов'
    };

    const newState = reducerOrder(
      initialState,
      getFeeds.rejected(error, 'rejected')
    );

    expect(newState.isLoading).toBeFalsy;
    expect(newState.error).toEqual(error.message);
  });

  test('Проверка getFeeds.fulfilled', async () => {
    const initialState: TOrderState = {
      feed: {
        orders: userOrders,
        total: 3,
        totalToday: 2,
      },
      orderData: [],
      orderRequest: false,
      orderModalData: null,
      isLoading: false,
      error: null
    };

    const feeds: TFeedsResponse = {
      orders: userOrders,
      total: initialState.feed ? initialState.feed.total : 0,
      totalToday: initialState.feed ? initialState.feed.totalToday : 0,
      success: true
    };

    const newState = reducerOrder(
      initialState,
      getFeeds.fulfilled(feeds, '')
    );

    newState.feed && expect(newState.feed.orders).toEqual(userOrders);
    expect(newState.error).toBeNull();
    expect(newState.isLoading).toBeFalsy();
  });
});



//getOrdersApi

import {
  getOrders,
} from '../services/slices/orderSlice';

describe('Проверка асинхронных экшенов получения пользовательских заказов', () => {
  test('Проверка getOrders.pending', async () => {
    const initialState: TOrderState = {
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
      },
      orderData: [],
      orderRequest: false,
      orderModalData: null,
      isLoading: false,
      error: null
    };

    const newState = reducerOrder(
      initialState,
      getOrders.pending('pending')
    );

    expect(newState.isLoading).toBeTruthy;
    expect(newState.error).toBeNull;
  });

  test('Проверка getOrders.rejected', async () => {
    const initialState = {
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
      },
      orderData: [],
      orderRequest: false,
      orderModalData: null,
      isLoading: false,
      error: null
    };

    const error: Error = {
      name: 'rejected',
      message: 'Ошибка получения списка пользовательских заказов'
    };

    const newState = reducerOrder(
      initialState,
      getOrders.rejected(error, 'rejected')
    );

    expect(newState.isLoading).toBeFalsy;
    expect(newState.error).toEqual(error.message);
  });

  test('Проверка getOrders.fulfilled', async () => {
    const initialState = {
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
      },
      orderData: [],
      orderRequest: false,
      orderModalData: null,
      isLoading: false,
      error: null
    };

    const newState = reducerOrder(
      initialState,
      getOrders.fulfilled(userOrders, '')
    );

    expect(newState.orderData).toEqual(userOrders);
    expect(newState.error).toBeNull;
    expect(newState.isLoading).toBeFalsy;
  });
});


// getOrderByNumberApi

import {
  getOrderByNumber
} from '../services/slices/orderSlice';
import { TOrderResponse } from '../utils/burger-api';

describe('Проверка асинхронных экшенов получения информации о заказе', () => {
  test('Проверка fetchOrderByNumber.pending', async () => {
    const initialState = {
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
      },
      orderData: [],
      orderRequest: false,
      orderModalData: null,
      isLoading: false,
      error: null
    };

    const newState = reducerOrder(
      initialState,
      getOrderByNumber.pending('pending', 2)
    );

    expect(newState.isLoading).toBeTruthy;
    expect(newState.error).toBeNull;
  });

  test('Проверка fetchOrderByNumber.rejected', async () => {
    const initialState = {
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
      },
      orderData: [],
      orderRequest: false,
      orderModalData: null,
      isLoading: false,
      error: null
    };

    const error: Error = {
      name: 'rejected',
      message: 'Ошибка получения списка заказов'
    };

    const newState = reducerOrder(
      initialState,
      getOrderByNumber.rejected(error, 'rejected', 2)
    );

    expect(newState.isLoading).toBeFalsy;
    expect(newState.error).toEqual(error.message);
  });

  test('Проверка fetchOrderByNumber.fulfilled', async () => {
    const initialState = {
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
      },
      orderData: [],
      orderRequest: false,
      orderModalData: null,
      isLoading: false,
      error: null
    };

    const currentOrder = initialState.feed.orders[0];

    const orders: TOrderResponse = {
      orders: [currentOrder],
      success: true
    };

    const newState = reducerOrder(
      initialState,
      getOrderByNumber.fulfilled(orders, '', 0)
    );

    expect(newState.feed?.orders).toEqual([currentOrder]);
    expect(newState.error).toBeNull;
    expect(newState.isLoading).toBeFalsy;
  });
});