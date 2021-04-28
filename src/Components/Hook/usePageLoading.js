import React, { useState } from 'react';
import ShowLoader from '../ShowLoader'

const usePageLoading = () => {
    const [loading, setloading] = useState(false)
    return [
        loading ? <ShowLoader /> : null,
        () => setloading(true),
        () => setloading(false)
    ]
}

export default usePageLoading;