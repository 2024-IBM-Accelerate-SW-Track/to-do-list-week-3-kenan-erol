import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
 const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
 const element = screen.getByRole('button', {name: /Add/i});
 const dueDate = "05/30/2023";
 fireEvent.change(inputTask, { target: { value: "History Test"}});
 fireEvent.change(inputDate, { target: { value: dueDate}});
 fireEvent.click(element);
 fireEvent.change(inputTask, { target: { value: "History Test"}});
 fireEvent.change(inputDate, { target: { value: dueDate}});
 fireEvent.click(element);
 const check = screen.getAllByText(/History Test/i);
//  const checkDate = screen.getByText(new RegExp(dueDate, "i"));
 expect(check.length).toBe(1);
//  expect(checkDate).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
 const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
 const element = screen.getByRole('button', {name: /Add/i});
 const dueDate = "05/30/2023";
//  fireEvent.change(inputTask, { target: { value: "History Test"}});
 fireEvent.change(inputDate, { target: { value: dueDate}});
 fireEvent.click(element);
 const check = screen.queryByText(new RegExp(dueDate, "i"));
//  const checkDate = screen.getByText(new RegExp(dueDate, "i"));
 expect(check).not.toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
//  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
 const element = screen.getByRole('button', {name: /Add/i});
//  const dueDate = "05/30/2023";
//  fireEvent.change(inputTask, { target: { value: "History Test"}});
 fireEvent.change(inputTask, { target: { value: "History Test"}});
 fireEvent.click(element);
 const check = screen.queryByText(/History Test/i);
//  const checkDate = screen.getByText(new RegExp(dueDate, "i"));
 expect(check).not.toBeInTheDocument();
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
 const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
 const element = screen.getByRole('button', {name: /Add/i});
 const dueDate = "05/30/2023";
//  fireEvent.change(inputTask, { target: { value: "History Test"}});
 fireEvent.change(inputTask, { target: { value: "History Test"}});
 fireEvent.change(inputDate, { target: { value: dueDate}});
 fireEvent.click(element);
//  const check = screen.queryByText(/History Test/i);
const checkbox = screen.getByRole('checkbox');
 fireEvent.click(checkbox);
 const check = screen.queryByText(/History Test/i);
//  const checkDate = screen.getByText(new RegExp(dueDate, "i"));
 expect(check).not.toBeInTheDocument();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
    fireEvent.click(element);
 //  const check = screen.queryByText(/History Test/i);
//  const checkbox = screen.getByRole('checkbox');
//   fireEvent.click(checkbox);
  const check = screen.getByText(/History Test/i).style.background;
 //  const checkDate = screen.getByText(new RegExp(dueDate, "i"));
  expect(check).not.toBe("white");
 });
