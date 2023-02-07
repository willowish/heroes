
import { Navbar } from 'src/app/components/navbar/navbar';
import HeroDetails from 'src/app/pages/heroDetails/heroDetails';
import MainPage from 'src/app/pages/mainPage/mainPage';
import { Routes } from 'src/config/routes';
import { HeroesProvider } from 'src/hooks/HeroesContext';
import { Route, Switch } from 'wouter';

// const MainPage = lazy(() => import('src/app/pages/mainPage/mainPage'));
// const HeroDetails = lazy(() => import('./pages/heroDetails/heroDetails'));

export function App() {
  return (
    <>
      <Navbar />
      <HeroesProvider>

        <Switch>
          {/*use hero context*/}
          <Route path={Routes.home} component={MainPage} />
          <Route path={Routes.hero} component={HeroDetails} />
        </Switch>
      </HeroesProvider>
    </>
  );
}

export default App;
