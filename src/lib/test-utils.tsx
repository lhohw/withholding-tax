import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { setupStore } from "app/store";
import type { RootState, AppStore } from "app/store";
import { Generation } from "features/corporate/corporateSlice";
import { MonthlyStatementOfPaymentOfWageAndSalary } from "features/person/personAPI";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <MemoryRouter>
        <Provider store={store}>{children}</Provider>
      </MemoryRouter>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function createMockSalary(
  year: string,
  generation: Generation[]
): MonthlyStatementOfPaymentOfWageAndSalary[] {
  return generation.map((gen, idx) => {
    const youth = gen === "청년" ? 100 : 0,
      manhood = gen === "장년" ? 200 : 0;
    return {
      payment: { youth, manhood },
      paymentDate: `${year}/${idx.toString().padStart(2, "0")}` as any,
      theAmountOfTaxCollected: {
        etc: { incomeTax: 0 },
        localIncomeTax: 0,
        simplifiedTaxAmountApplicable: {
          payRange: [0, 0],
          incomeTax: 0,
        },
        totalIncomeTax: 0,
      },
      totalPay: {
        bonus: 0,
        exceedingTheLimitOnTheAmountOfIncomeForExecutiveRetirement: 0,
        pay: youth + manhood,
        profitFromExerciseOfStockOption: 0,
        recognitionBonus: 0,
        total: youth + manhood,
        withdrawalFromOurEmployeeStockOwnershipAssociation: 0,
      },
    };
  });
}
