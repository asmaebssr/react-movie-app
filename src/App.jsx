import Layout from './layouts/Layout';
import Trending from './pages/trending';
import Movies from './pages/movies';
import TvSeries from './pages/tvSeries';
import Search from './pages/search';
import MoreInfos from './components/MoreInfos';

import {
  Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider
} from 'react-router-dom';


const router = createBrowserRouter(
createRoutesFromElements(
<Route path='/' element={<Layout />}>
  <Route index element={<Trending />}></Route>
  <Route path='/movies' element={<Movies />}></Route>
  <Route path='/TvSeries' element={<TvSeries />}></Route>
  <Route path='/Search' element={<Search />}></Route>
  <Route path='/infos/:id' element={<MoreInfos />}></Route>
</Route>

));

const App = () => {
  return(
    <RouterProvider router={router} />
  )
};

export default App;