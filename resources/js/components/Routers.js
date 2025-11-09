import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Portfolio from "./Portfolio";

export default function Routers() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Portfolio} />
      </Switch>
    </Router>
  );
}

if (document.getElementById("root")) {
  const root = createRoot(document.getElementById("root"));
  root.render(<Routers />);
}