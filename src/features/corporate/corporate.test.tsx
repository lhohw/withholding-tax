import { screen } from "@testing-library/react";

import type { CorporateState } from "./corporateSlice";
import corporateReducer, {
  setPersonnel,
  toggle,
  toggleItem,
} from "./corporateSlice";

import {
  personnelData,
  corporateData,
  personId,
  last6Years,
  RN,
} from "constants/test";
import { renderWithProviders } from "lib/test-utils";

import Corporate from "./Corporate";

describe("corporate reducer", () => {
  const initialState: CorporateState = {};

  const preloadedState: CorporateState = corporateReducer(
    initialState,
    setPersonnel({ RN, data: personnelData })
  );

  it("should handle initial state", () => {
    expect(corporateReducer(undefined, { type: "unknown" })).toEqual({});
  });

  it("should handle setPersonnel", () => {
    const { name, address, data } = preloadedState["000-00-00000"];
    expect(name).toBe("Test");
    expect(address).toBe("부산광역시연제구 경기장로13 (거제동)");
    expect(data).toEqual(corporateData);
  });
  it("should handle toggle", () => {
    const id = personId[0],
      year = last6Years[0],
      RN = "000-00-00000";
    const actual = corporateReducer(preloadedState, toggle({ id, year, RN }));
    expect(actual[RN].data[year]["personnel"][id].info.checked).toEqual(
      new Array(12).fill(true)
    );
    const { payment, generation, sum } = actual[RN].data[year].total;
    expect(payment).toEqual({ youth: 0, manhood: 0 });
    expect(generation).toEqual({
      youth: new Array(12).fill(0),
      manhood: new Array(12).fill(0),
      total: new Array(12).fill(0),
    });
    expect(sum).toEqual({ youth: 0, manhood: 0, total: 0 });
  });

  it("should handle toggleItem", () => {
    const id = personId[0],
      year = last6Years[0],
      idx = 9,
      content = "장년";
    const actual = corporateReducer(
      preloadedState,
      toggleItem({ id, year, RN, idx, content })
    );
    expect(actual[RN].data[year].personnel[id].info.checked).toEqual(
      new Array(12).fill(undefined).map((_, i) => (i === idx ? true : false))
    );
    const { generation, sum } = actual[RN].data[year].total;
    expect(generation).toEqual({
      youth: [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
      manhood: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      total: [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1],
    });
    expect(sum).toEqual({
      youth: 2,
      manhood: 2,
      total: 4,
    });
  });

  it("should handle color", () => {
    renderWithProviders(
      <Corporate RN={RN} data={personnelData} year={last6Years[1]} />
    );
    expect(
      screen
        .getAllByTitle("급여 및 인원 포함. 근무일 27일 초과 31일 이하")
        .every((e) => getComputedStyle(e).color === "rgb(179, 84, 238)")
    ).toBeTruthy();

    renderWithProviders(
      <Corporate RN={RN} data={personnelData} year={last6Years[2]} />
    );
    expect(
      screen
        .getAllByTitle("삭제됨. 급여 및 인원 미포함")
        .every((e) => getComputedStyle(e).color === "rgb(236, 111, 110)")
    ).toBeTruthy();
  });
});
