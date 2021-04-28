import React from 'react'
import { Route } from 'react-router-dom';


function BookingLayout(props) {
    return (
        <div>
            {props.children}
        </div>
    );
}



export default function BookingTemplate({ Component, ...props }) {
    return (
        <Route
            {...props}
            render={propsComponent => (
                <BookingLayout>
                    <Component {...propsComponent} />
                </BookingLayout>
            )}
        />
    );
}
