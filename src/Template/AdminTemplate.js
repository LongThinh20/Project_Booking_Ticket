import React from 'react';
import { Route } from 'react-router-dom';
import NavbarAdmin from '../Components/NavbarAdmin'

function AdminLayout(props) {
    return (
        <div>
            <NavbarAdmin />
            {props.children}
        </div>
    );
}

export default function BookingAdmin({ Component, ...props }) {
    return (
        <Route
            {...props}
            render={propComponent => (
                <AdminLayout>
                    <Component {...props} />
                </AdminLayout>
            )}
        />
    );
}
