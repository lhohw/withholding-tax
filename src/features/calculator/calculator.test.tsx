import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link, Route, Routes } from "react-router-dom";

import { RN, corporateData } from "constants/test";
import {
  socialInsuranceRate as SIR,
  industrialAccidentRate as IAR,
} from "constants/law";

import { renderWithProviders } from "lib/test-utils";
import { getLastYears } from "lib/values";
import { roundOff } from "lib/utils";

import Calculator from "./Calculator";

describe("calculator", () => {
  const render = () =>
    renderWithProviders(
      <Routes>
        <Route
          path="/"
          element={<Link data-testid="link" to="/calculator" state={{ RN }} />}
        />
        <Route path="/calculator" element={<Calculator />} />
      </Routes>,
      {
        preloadedState: {
          corporate: {
            [RN]: {
              name: "Test",
              address: "부산광역시연제구 경기장로13 (거제동)",
              data: corporateData,
            },
          },
        },
      }
    );

  const user = userEvent.setup();
  it("social", async () => {
    const { store } = render();
    await user.click(screen.getByTestId("link"));
    const socialButton = screen.getByText("사회보험");
    expect(socialButton).toBeInTheDocument();

    await user.click(socialButton);
    await user.type(screen.getByPlaceholderText("사회보험요율 코드"), "218");

    const results = screen.getAllByText(/\d 원$/);
    const last5Years = getLastYears(5);
    const {
      data: { variation, monthCnts, paymentSum, generationSum },
      code,
    } = store.getState().calculator;
    results
      .map((res) => res.innerHTML)
      .forEach((result, idx) => {
        const year = last5Years[Math.floor(idx / 2)];
        const key = idx % 2 === 0 ? "youth" : "manhood";
        const Variation = roundOff(variation[year][key] / monthCnts[year]),
          TotalSalary = paymentSum[year][key],
          Total = roundOff(generationSum[year][key] / monthCnts[year]),
          SocialInsuranceRate =
            Math.floor(
              (Object.values(SIR[year]).reduce((x, y) => x + y) +
                IAR[year][code] / 10) *
                1e2
            ) / 1e4,
          Rate = key === "youth" ? 1 : 0.5;

        const expected =
          (Variation <= 0
            ? 0
            : Math.max(
                0,
                Math.floor(
                  Variation *
                    ((TotalSalary / Total) * SocialInsuranceRate) *
                    Rate
                )
              )) + " 원";
        expect(expected).toBe(result);
      });
  });
  it("employment", async () => {
    const { store } = render();
    await user.click(screen.getByTestId("link"));
    const employmentButton = screen.getByText("고용증대");
    expect(employmentButton).toBeInTheDocument();
    await user.click(employmentButton);
    expect(
      screen.getByText("사업 규모와 수도권 여부를 선택하세요")
    ).toBeInTheDocument();

    const smallCorporateButton = screen.getByText("중소");
    expect(smallCorporateButton).toBeInTheDocument();
    await user.click(smallCorporateButton);
    const notCapitalButton = screen.getByText("비수도권");
    expect(notCapitalButton).toBeInTheDocument();
    expect(getComputedStyle(notCapitalButton).color).toBe("rgb(50, 88, 168)");

    const {
      employmentIncreaseData,
      data: { variation },
    } = store.getState().calculator;

    let consecutiveYouth = 0,
      consecutiveTotal = 0;

    const expected = getLastYears(5)
      .map((year, idx) => {
        if (idx === 0) return true;
        const isYouthDecrease = variation[year].youth < 0,
          isTotalDecrease = variation[year].total < 0;
        const currentYearData: typeof employmentIncreaseData[string] =
          employmentIncreaseData[year];

        if (isTotalDecrease) consecutiveTotal = 0;
        else consecutiveTotal = Math.min(2, consecutiveTotal + 1);
        if (isYouthDecrease) consecutiveYouth = 0;
        else consecutiveYouth = Math.min(2, consecutiveYouth + 1);

        return (
          (isYouthDecrease ||
            isTotalDecrease ||
            +year - 1 < 2018 ||
            employmentIncreaseData[+year - 1].thisYear.youth ===
              currentYearData.lastYear.youth) &&
          (isTotalDecrease ||
            +year - 1 < 2018 ||
            employmentIncreaseData[+year - 1].thisYear.manhood ===
              currentYearData.lastYear.manhood) &&
          (isYouthDecrease ||
            isTotalDecrease ||
            idx < 2 ||
            +year - 2 < 2018 ||
            consecutiveYouth < 2 ||
            consecutiveTotal < 2 ||
            employmentIncreaseData[+year - 2].thisYear.youth ===
              currentYearData.last2Year.youth) &&
          (isTotalDecrease ||
            idx < 2 ||
            +year - 2 < 2018 ||
            consecutiveTotal < 2 ||
            employmentIncreaseData[+year - 2].thisYear.manhood ===
              currentYearData.last2Year.manhood)
        );
      })
      .every((e) => e === true);
    expect(expected).toBeTruthy();
  });
});
