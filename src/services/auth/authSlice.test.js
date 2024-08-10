import reducer, {
  setUser,
  setIsAuthChecked,
  loginUser,
  logoutUser,
  checkAuthStatus,
  initialState
} from "./authSlice";

describe("authSlice", () => {
  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setUser", () => {
    const actual = reducer(
      initialState,
      setUser({ name: "John Doe", email: "john@example.com" })
    );
    expect(actual.user).toEqual({
      name: "John Doe",
      email: "john@example.com",
    });
    expect(actual.error).toBeNull();
  });

  it("should handle setIsAuthChecked", () => {
    const actual = reducer(initialState, setIsAuthChecked(true));
    expect(actual.isAuthChecked).toEqual(true);
  });

  it("should handle loginUser.pending", () => {
    const action = { type: loginUser.pending.type };
    const actual = reducer(initialState, action);
    expect(actual.isAuthorizationInProcess).toEqual(true);
    expect(actual.isAuthorizationFailed).toEqual(false);
    expect(actual.isAuthorizationSuccess).toEqual(false);
  });

  it("should handle loginUser.fulfilled", () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: { user: { name: "John Doe" }, accessToken: "token" },
    };
    const actual = reducer(initialState, action);
    expect(actual.user).toEqual({ name: "John Doe" });
    expect(actual.isAuthorizationInProcess).toEqual(false);
    expect(actual.isAuthorizationSuccess).toEqual(true);
    expect(actual.isAuthenticated).toEqual(true);
    expect(actual.isLoggedIn).toEqual(true);
    expect(actual.accessToken).toEqual("token");
    expect(actual.isAuthChecked).toEqual(true);
  });

  it("should handle loginUser.rejected", () => {
    const action = { type: loginUser.rejected.type };
    const actual = reducer(initialState, action);
    expect(actual.isAuthorizationInProcess).toEqual(false);
    expect(actual.isAuthorizationFailed).toEqual(true);
  });

  it("should handle logoutUser.fulfilled", () => {
    const action = { type: logoutUser.fulfilled.type };
    const actual = reducer(initialState, action);
    expect(actual.user).toBeNull();
    expect(actual.isAuthenticated).toEqual(false);
    expect(actual.isLoggedIn).toEqual(false);
    expect(actual.isAuthorizationInProcess).toEqual(false);
    expect(actual.isAuthorizationSuccess).toEqual(false);
    expect(actual.accessToken).toEqual("");
    expect(actual.email).toEqual("");
    expect(actual.name).toEqual("");
  });

  it('should handle checkAuthStatus.fulfilled', () => {
    const action = { type: checkAuthStatus.fulfilled.type, payload: { name: 'John Doe' } };
    const actual = reducer(initialState, action);
    expect(actual.user).toEqual({ name: 'John Doe' });
    expect(actual.isAuthenticated).toEqual(true);
    expect(actual.isAuthChecked).toEqual(true);
  });

  it('should handle checkAuthStatus.rejected', () => {
    const action = { type: checkAuthStatus.rejected.type };
    const actual = reducer(initialState, action);
    expect(actual.isAuthChecked).toEqual(true);
    expect(actual.isAuthenticated).toEqual(false);
    expect(actual.user).toBeNull();
  });
});