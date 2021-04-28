
import React from "react";
import { Route } from "react-router-dom";
import Header1 from "./../Components/Header1";
import Footer from "./../Components/Footer";

function HomeLayout(props) {
    return (
        <div>
            <Header1 />
            {props.children}
            <Footer/>
        </div>
    );
}

export default function HomeTemplate({ Component, ...props }) {
    return (
        <Route
            {...props}
            render={propsComponent => (
                <HomeLayout>
                    <Component {...propsComponent} />
                </HomeLayout>
            )}
        />
    );
}
