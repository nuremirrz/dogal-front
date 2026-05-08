import React from 'react';
import { Button, Result } from 'antd';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error('UI crash:', error, info);
    }

    handleReload = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    handleHome = () => {
        this.setState({ hasError: false, error: null });
        window.location.href = '/';
    };

    render() {
        if (!this.state.hasError) return this.props.children;

        return (
            <Result
                status="error"
                title="Что-то пошло не так"
                subTitle="Произошла непредвиденная ошибка. Попробуйте обновить страницу или вернуться на главную."
                extra={[
                    <Button type="primary" key="reload" onClick={this.handleReload}>
                        Обновить
                    </Button>,
                    <Button key="home" onClick={this.handleHome}>
                        На главную
                    </Button>,
                ]}
            />
        );
    }
}

export default ErrorBoundary;