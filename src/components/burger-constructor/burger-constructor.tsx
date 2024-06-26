import { FC, useMemo, useEffect } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { getBurger, orderReset } from '../../services/slices/orderSlice';
import { clearConstructor } from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(
    (store) => store.constructorBurger.constructorItems
  );
  const orderRequest = useSelector((store) => store.order.orderRequest);
  const orderModalData = useSelector((store) => store.order.orderModalData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.userData);
  const ingredients = constructorItems.ingredients.map((elem) => elem._id);

  useEffect(
    () => () => {
      dispatch(orderReset());
    },
    []
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    const orderData = [
      constructorItems.bun?._id,
      ...ingredients,
      constructorItems.bun._id
    ];
    if (!user?.name) {
      navigate('/login');
    } else {
      dispatch(getBurger(orderData));
    }
  };
  const closeOrderModal = () => {
    dispatch(orderReset());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
