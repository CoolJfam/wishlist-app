import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddItem from "./AddItem";

// test("show add item modal", async () => {
//   render(<AddItem />);
//   const addButton = screen.getByTestId("add-btn");

//   expect(screen.queryByLabelText("Item Name:")).not.toBeInTheDocument();

//   userEvent.click(addButton);

//   await waitFor(() => {
//     expect(screen.getByLabelText("Item Name:")).toBeInTheDocument();
//   });
// });

test("save new item", async () => {
  render(<AddItem />);
  const addButton = screen.getByTestId("add-btn");

  userEvent.click(addButton);

  await waitFor(() => {
    userEvent.click(screen.getByText("Save"));
  });

  expect(screen.queryByLabelText("Item Name:")).not.toBeInTheDocument();
});

test("cancel save", async () => {
  render(<AddItem />);
  const addButton = screen.getByTestId("add-btn");

  userEvent.click(addButton);

  await waitFor(() => {
    userEvent.click(screen.getByTestId("cancel-save-btn"));
  });

  expect(screen.queryByLabelText("Item Name:")).not.toBeInTheDocument();
});
