import React, { Fragment, useEffect } from 'react';
import './App.scss';
import PageNotFound from './Screens/PageNotFound'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import HomeTemplate from './Template/HomeTemplate';
import BookingTemplate from './Template/BookingTemplate';
import AdminTemplate from './Template/AdminTemplate';
import { routesAdmin, routesBooking, routesHome } from './Routes';

function App() {

  const showHomeLayout = routes => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) => {
        return (
          <HomeTemplate
            key={index}
            exact={item.exact}
            path={item.path}
            Component={item.component}
          />
        )
      })
    }
  }

  const showBookingLayout = routes => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) => {
        return (
          <BookingTemplate
            key={index}
            exact={item.exact}
            path={item.path}
            Component={item.component}
          />
        )
      })
    }
  }
  const showAdminLayout = routes => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) => {
        return (
          <AdminTemplate
            key={index}
            exact={item.exact}
            path={item.path}
            Component={item.component}
          />
        );
      });
    }
  };

  const dispatch = useDispatch();
  const credentialStr = localStorage.getItem('credentials');
  const getCredentialFormLocal = () => {

    if (typeof (Storage) !== 'undefined') {

      dispatch({
        type: 'FETCH_CREDENTIALS',
        payload: JSON.parse(credentialStr)
      })
    } else {
      alert('Trình duyệt của bạn đã quá cũ. Hãy nâng cấp trình duyệt ngay!');
    }


  }

  useEffect(() => {
    getCredentialFormLocal();
  }, [])

  return (
    <BrowserRouter>
      <Fragment>
        <div className="App">
          <header className="App-header">

          </header>
        </div>

        <Switch>
          {showHomeLayout(routesHome)}
          {showBookingLayout(routesBooking)}
          {
            credentialStr ?
              (
                JSON.parse(credentialStr).maLoaiNguoiDung === 'QuanTri'
                  ? showAdminLayout(routesAdmin)
                  : ''

              )
              : ''
          }
          <Route path="" component={PageNotFound} />
        </Switch>

      </Fragment>
    </BrowserRouter>
  );
}

export default App;

