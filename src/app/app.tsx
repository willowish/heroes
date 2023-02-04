import { lazy } from 'react';

import { Navbar } from 'src/app/components/navbar/navbar';
import { Routes } from 'src/config/routes';
import { Switch, Route } from 'wouter';

const MainPage = lazy(() => import('src/app/pages/MainPage/MainPage'));
const HeroDetails = lazy(() => import('./pages/heroDetails/heroDetails'));

export function App() {
  return (
    <>
      <Navbar />
      <Switch>
          <Route path={Routes.home} component={MainPage} />
          <Route path={Routes.hero} component={HeroDetails} />
      </Switch>
    </>
  );
}

export default App;
