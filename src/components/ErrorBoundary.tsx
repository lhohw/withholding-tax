import type { DarkModeState } from "features/darkMode/darkModeSlice";
import React from "react";
import { css } from "@emotion/react";
import colors from "constants/colors";
import { useAppSelector } from "app/hooks";

export type ErrorBoundaryProps = {
  theme: DarkModeState["theme"];
  children: string | React.ReactNode;
};
export type ErrorBoundaryState = {
  hasError: boolean;
  // error: string;
};
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      // error: "",
    };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      ...this.state,
      // error: `${error.name} ${error.message}`,
    });
  }
  componentWillUnmount(): void {
    this.setState({
      hasError: false,
      // error: "",
    });
  }
  render() {
    if (this.state.hasError) {
      const { theme } = this.props;
      return (
        <div
          css={css`
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              padding: 1rem;
              background-color: ${colors.background[theme]};
              border: 2px solid ${colors.text[theme]};
              align-items: center;
              border-radius: 12px;
              max-width: 500px;
            `}
          >
            <h3
              css={css`
                padding: 0.5rem 0;
                margin: 0;
                color: ${colors.main};
                font-size: 30px;
                & > p {
                  padding: 0;
                  margin: 1rem 0;
                  font-size: 22px;
                  color: ${colors.text[theme]};
                }
              `}
            >
              😥 에러 발생 😥
            </h3>
            <p>관리자에게 문의 바랍니다.</p>
            {/* <p>{this.state.error}</p> */}
            <button
              css={css`
                margin: 1rem;
                padding: 0.5rem 1rem;
                background-color: ${colors.background[theme]};
                color: ${colors.text[theme]};
                display: flex;
                box-shadow: 0 0 3px ${colors.main};
                border: 1px solid ${colors.text[theme]};
                border-radius: 6px;
                font-size: 17px;
                cursor: pointer;
              `}
              onClick={() => {
                if (!window) return;
                window.location.replace("/");
              }}
            >
              🏠 메인 화면으로 이동
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const ErrorBoundaryWithTheme = (props: Omit<ErrorBoundaryProps, "theme">) => {
  const { theme } = useAppSelector((state) => state.darkMode);
  return <ErrorBoundary theme={theme} {...props} />;
};

export default ErrorBoundaryWithTheme;
