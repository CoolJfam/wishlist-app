import { screen, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Item from "./Item";

test("favorite items", async () => {
  render(<Item />);
  const favoriteButton = screen.getByTestId("favorite-btn");

  expect(screen.getByTestId("favorite-btn")).toHaveAttribute(
    "aria-label",
    "unfavorite"
  );

  userEvent.click(favoriteButton);

  expect(screen.getByTestId("favorite-btn")).toHaveAttribute(
    "aria-label",
    "favorite"
  );
});

// test("show delete modal", async () => {
//   render(<Item />);
//   const deleteButton = screen.getByTestId("delete-modal-btn");

//   expect(
//     screen.queryByText(
//       "Are you sure you want to delete this Item? (This cannot be undone)"
//     )
//   ).not.toBeInTheDocument();

//   userEvent.click(deleteButton);

//   await waitFor(() =>
//     expect(
//       screen.getByText(
//         "Are you sure you want to delete this Item? (This cannot be undone)"
//       )
//     ).toBeInTheDocument()
//   );
// });

test("delete item", async () => {
  render(<Item />);
  const deleteButton = screen.getByTestId("delete-modal-btn");

  userEvent.click(deleteButton);

  await waitFor(() => {
    userEvent.click(screen.getByText("Delete"));
  });

  expect(
    screen.queryByText(
      "Are you sure you want to delete this Item? (This cannot be undone)"
    )
  ).not.toBeInTheDocument();
});

test("cancel delete", async () => {
  render(<Item />);
  const deleteButton = screen.getByTestId("delete-modal-btn");

  userEvent.click(deleteButton);

  await waitFor(() => {
    userEvent.click(screen.getByText("Cancel"));
  });

  expect(
    screen.queryByText(
      "Are you sure you want to delete this Item? (This cannot be undone)"
    )
  ).not.toBeInTheDocument();
});
