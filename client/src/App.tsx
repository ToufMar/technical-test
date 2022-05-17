import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import env from "./dist/envConfig";
import { useAxios } from "./hooks/useAxios";
import { Home } from "./components/home";
import { Update } from "./components/update";
import { Product } from "./components/product";
import { Create } from "./components/create";

function App() {
    const [data, methods] = useAxios();

    useEffect(() => {
        methods.getData(env.API_URL + "/");
    }, []);

    if (data) {
        console.log(data);
    }

    return (
        <div className="App">
            <h1>Test Technique</h1>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/create" component={Create} />
                    <Route exact path="/:uuid" component={Product} />
                    <Route exact path="/:uuid/update" component={Update} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
