import { lazy } from 'react';

import { Navbar } from 'src/app/components/navbar/navbar';
import { Routes } from 'src/config/routes';
import { Switch, Route } from 'wouter';

const ListOfHeroes = lazy(() => import('./pages/listOfHeroes/listOfHeroes'));
const HeroDetails = lazy(() => import('./pages/heroDetails/heroDetails'));

export function App() {
  return (
    <>
      <Navbar />
      <Switch>
          <Route path={Routes.home} component={ListOfHeroes} />
          <Route path={Routes.hero} component={HeroDetails} />
      </Switch>
    </>
  );
}

export default App;
