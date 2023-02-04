import { lazy } from 'react';

import { Navbar } from 'src/app/components/navbar/navbar';
import { Routes } from 'src/config/routes';
import { HeroesProvider } from 'src/hooks/HeroesContext';
import { Route, Switch } from 'wouter';

const MainPage = lazy(() => import('src/app/pages/mainPage/mainPage'));
const HeroDetails = lazy(() => import('./pages/heroDetails/heroDetails'));

export function App() {
  return (
    <>
      <Navbar />
      <Switch>
        {/*use hero context*/}
        <HeroesProvider>
          <Route path={Routes.home} component={MainPage} />
          <Route path={Routes.hero} component={HeroDetails} />
        </HeroesProvider>
      </Switch>
    </>
  );
}

export default App;
