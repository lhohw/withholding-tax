import React from "react";
import { css } from "@emotion/react";
import { whiteGradient2 } from "styles/gradient";

export type ErrorBoundaryProps = {
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
              align-items: center;
              max-width: 500px;
              border: 2px solid var(--orange);
              border-radius: 12px;
              background: ${whiteGradient2};
              box-shadow: 27px 27px 54px #8a8989, -27px -27px 54px #ffffff;

              color: var(--orange);
              text-shadow: 1px 1px 1px var(--placeholder);
            `}
          >
            <h3
              css={css`
                padding: 0.5rem 0;
                margin: 0;
                font-size: 30px;
                & > p {
                  padding: 0;
                  margin: 1rem 0;
                  font-size: 24px;
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
                display: flex;
                font-size: 17px;
                font-weight: bold;
                background-color: inherit;
                border: none;
                border: 2px solid var(--light-orange);
                border-radius: 8px;
                background: ${whiteGradient2};
                cursor: pointer;
                color: var(--black);
                position: relative;
                transition: 0.25s color ease-in-out;
                &:hover {
                  color: var(--light-orange);
                }
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

export default ErrorBoundary;
