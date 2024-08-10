import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  initialState,
} from "./burgerConstructorSlice";
import { v4 as uuidv4 } from "uuid";

jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

const bun = { id: "1", name: "Bun", type: "bun", price: 1 };
const patty = {
  id: "2",
  name: "Patty",
  type: "main",
  price: 2,
  uniqueKey: "key-1",
};
const lettuce = {
  id: "3",
  name: "Lettuce",
  type: "main",
  price: 1,
  uniqueKey: "key-2",
};

describe("burgerConstructorSlice", () => {
  beforeEach(() => {
    uuidv4.mockReturnValue("unique-key");
  });

  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle addIngredient for bun", () => {
    const actual = reducer(initialState, addIngredient(bun));
    expect(actual.bun).toEqual({ ...bun, uniqueKey: "unique-key" });
    expect(actual.ingredients).toEqual([]);
  });

  it("should handle addIngredient for non-bun", () => {
    const actual = reducer(initialState, addIngredient(patty));
    expect(actual.bun).toBeNull();
    expect(actual.ingredients).toEqual([{ ...patty, uniqueKey: "unique-key" }]);
  });

  it("should handle removeIngredient", () => {
    const initialStateWithIngredients = {
      bun: null,
      ingredients: [{ ...patty }],
    };
    const actual = reducer(
      initialStateWithIngredients,
      removeIngredient({ uniqueKey: "key-1" })
    );
    expect(actual.ingredients).toEqual([]);
  });

  it("should handle moveIngredient", () => {
    const initialStateWithIngredients = {
      bun: null,
      ingredients: [{ ...patty }, { ...lettuce }],
    };
    const actual = reducer(
      initialStateWithIngredients,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );
    expect(actual.ingredients).toEqual([{ ...lettuce }, { ...patty }]);
  });

  it("should handle clearConstructor", () => {
    const initialStateWithIngredients = {
      bun: { ...bun, uniqueKey: "unique-key" },
      ingredients: [{ ...patty }],
    };
    const actual = reducer(initialStateWithIngredients, clearConstructor());
    expect(actual).toEqual(initialState);
  });
});
