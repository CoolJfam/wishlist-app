import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Item from "./Item";
import AddItem from "./AddItem";
import { ItemProvider } from "./ItemContext";

test("cancel save", async () => {
  render(
    <ItemProvider>
      <AddItem />
    </ItemProvider>
  );
  const user = userEvent.setup();
  const addButton = screen.getByTestId("add-btn");

  await user.click(addButton);

  await user.click(screen.getByTestId("cancel-save-btn"));

  expect(screen.queryByLabelText("Item Name:")).not.toBeInTheDocument();
});

test("favorite item", async () => {
  render(
    <ItemProvider>
      <Item />
      <AddItem />
    </ItemProvider>
  );
  const user = userEvent.setup();
  const addButton = screen.getByTestId("add-btn");

  await user.click(addButton);

  const itemNameTextfield = screen.getByTestId("item-name");
  const itemPriceTextfield = screen.getByTestId("item-price");
  const itemLinkTextfield = screen.getByTestId("item-link");

  await user.type(itemNameTextfield, "test item");
  await user.type(itemPriceTextfield, "10");
  await user.type(itemLinkTextfield, "http://test.com");

  await user.click(screen.getByText("Save"));

  const favoriteButton = screen.getByTestId("favorite-btn");

  expect(favoriteButton).toHaveAttribute("aria-label", "unfavorite");

  await user.click(favoriteButton);

  expect(favoriteButton).toHaveAttribute("aria-label", "favorite");
});

test("delete item", async () => {
  render(
    <ItemProvider>
      <Item />
      <AddItem />
    </ItemProvider>
  );
  const user = userEvent.setup();
  const addButton = screen.getByTestId("add-btn");

  await user.click(addButton);

  const itemNameTextfield = screen.getByTestId("item-name");
  const itemPriceTextfield = screen.getByTestId("item-price");
  const itemLinkTextfield = screen.getByTestId("item-link");

  await user.type(itemNameTextfield, "test item");
  await user.type(itemPriceTextfield, "10");
  await user.type(itemLinkTextfield, "http://test.com");

  await user.click(screen.getByText("Save"));

  const deleteButton = screen.getByTestId("delete-modal-btn");

  await user.click(deleteButton);

  await user.click(screen.getByText("Delete"));

  expect(
    screen.queryByText(
      "Are you sure you want to delete this Item? (This cannot be undone)"
    )
  ).not.toBeInTheDocument();
});

test("cancel delete", async () => {
  render(
    <ItemProvider>
      <Item />
      <AddItem />
    </ItemProvider>
  );
  const user = userEvent.setup();
  const addButton = screen.getByTestId("add-btn");

  await user.click(addButton);

  const itemNameTextfield = screen.getByTestId("item-name");
  const itemPriceTextfield = screen.getByTestId("item-price");
  const itemLinkTextfield = screen.getByTestId("item-link");

  await user.type(itemNameTextfield, "test item");
  await user.type(itemPriceTextfield, "10");
  await user.type(itemLinkTextfield, "http://test.com");

  await user.click(screen.getByText("Save"));

  const deleteButton = screen.getByTestId("delete-modal-btn");

  await user.click(deleteButton);

  await user.click(screen.getByText("Cancel"));

  expect(
    screen.queryByText(
      "Are you sure you wnat to delete this Item? (This cannot be undone)"
    )
  ).not.toBeInTheDocument();
});
