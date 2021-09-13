import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './hocs/Layout';
import Blog from './components/Blog';
import BlogDetail from './components/BlogDetail';
import Category from './components/Category';
import { HomePage } from './pages/HomePage';
import Search from './components/Search';
import { CreatePostPage } from './pages/CreatePostPage';
import Profile from './components/Profile';
import Filter from './components/Filter';
import Pagination from './components/Pagination';
import Cursor from './components/Cusor';
const App = () => (
  <Router>
    <Layout>
      <Switch>
      <Route exact path="/cursor" component={Cursor} />
      <Route exact path="/pagination/:cusor" component={Pagination} />
      <Route exact path="/filter/:id" component={Filter} />
      <Route exact path="/profile" component={Profile} />
        <Route exact path="/addpost" component={CreatePostPage} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/category/:id" component={Category} />
        <Route exact path="/blog/:id" component={BlogDetail} />
      </Switch>
    </Layout>
  </Router>
);

export default App;
