import { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink, Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to='/'
            className={clsx(styles.link, 'text text_type_main-default ml-2', {
              [styles.link_active]: location.pathname === '/'
            })}
          >
            <BurgerIcon type={'primary'} />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </NavLink>
          <NavLink
            to='/feed'
            className={clsx(styles.link, 'text text_type_main-default ml-2', {
              [styles.link_active]: location.pathname === '/feed'
            })}
          >
            <ListIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </NavLink>
        </div>
        <Link to='/'>
          <div className={styles.logo}>
            <Logo className='' />
          </div>
        </Link>
        <div className={styles.link_position_last}>
          <NavLink
            to='/profile'
            className={clsx(styles.link, 'text text_type_main-default ml-2', {
              [styles.link_active]: location.pathname === '/profile'
            })}
          >
            <ProfileIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
