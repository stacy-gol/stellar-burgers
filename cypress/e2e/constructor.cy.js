describe("Constructor Page", () => {
  let ingredientsData;

  beforeEach(() => {
    cy.intercept("GET", "/api/ingredients", { fixture: "ingredients.json" }).as(
      "getIngredients"
    );
   
    cy.visit("http://localhost:3000");
    cy.wait("@getIngredients");

    cy.fixture("ingredients.json").then((data) => {
      ingredientsData = data;
    });
    cy.get('[data-cy="ingredient"]').as("ingredients");
    cy.get('[data-cy="constructor"]').as("constructor");
    cy.get('[data-cy="order-button"]').as("orderButton");
  });

  it("should find ingredients on the page", () => {
    // Проверка, что на странице есть как минимум 3 элемента, представляющие ингредиенты
    cy.get("@ingredients").should("have.length.at.least", 3);
  });

  it("should open modal, check content and then close it", () => {
    // Открытие модального окна при клике на первый ингредиент
    cy.get("@ingredients").first().click();

    // Проверка заголовка модального окна и текста в карточке ингредиента
    cy.get('[data-cy="modal"]').should("be.visible");
    cy.get('[data-cy="modal-title"]').should("contain", "Детали ингредиента");
    cy.get('[data-cy="modal-content"]').should(
      "contain",
      ingredientsData.data[0].name
    );

    // Проверка содержания информации о питательных веществах
    cy.get('[data-cy="modal-content"]').should(
      "contain",
      ingredientsData.data[0].calories
    );
    cy.get('[data-cy="modal-content"]').should(
      "contain",
      ingredientsData.data[0].proteins
    );
    cy.get('[data-cy="modal-content"]').should(
      "contain",
      ingredientsData.data[0].fat
    );
    cy.get('[data-cy="modal-content"]').should(
      "contain",
      ingredientsData.data[0].carbohydrates
    );

    // Закрытие модального окна
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should("not.exist");
  });

  it("should test dnd and order functionality", () => {
    // Проверка наличия инструкций в конструкторе
    cy.get("@constructor").should("contain", "Перетащите верхнюю булку");

    // Перетаскивание булки и ингредиента в конструктор
    cy.get("@ingredients").contains("булка").trigger("dragstart");
    cy.get('[data-cy="bun"]').first().trigger("dragover").trigger("drop");
    cy.get("@ingredients")
      .not(':contains("булка")')
      .first()
      .trigger("dragstart");
    cy.get("@constructor").trigger("drop");

    // Проверка, что инструкции исчезают после добавления ингредиентов
    cy.get("@constructor").should("not.contain", "булку");
    cy.get("@constructor").should("not.contain", "ингредиент");
    cy.get("@constructor").should("contain", ingredientsData.data[0].name);
    cy.get("@constructor").should("contain", ingredientsData.data[1].name);

    // Начало оформления заказа
    cy.get("@orderButton").click();
  });
});
