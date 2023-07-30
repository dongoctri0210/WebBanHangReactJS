import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutSite from "./layouts/LayoutSite";
import RouterSite from "./router";
import LayoutAdmin from "./layouts/LayoutAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutSite />}>
          {RouterSite.RouterPublic.map(function (router, index) {
            const Page = router.component;
            return <Route key={index} path={router.path} element={<Page />} />;
          })}
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          {RouterSite.RouterPrivate.map(function (router, index) {
            const Page = router.component;
            return <Route key={index} path={router.path} element={<Page />} />;
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
