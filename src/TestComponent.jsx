import React, { useEffect, useState } from 'react';

const TestComponent = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/test');
            const result = await response.json();
            setData(result.message);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Проверка API:</h1>
            {data ? <p>{data}</p> : <p>Загрузка...</p>}
        </div>
    );
};

export default TestComponent;
