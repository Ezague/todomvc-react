import Todomvc from "./Todomvc";

test('Check if handleAddTodo works correctly', () => {
    const todoNameRef = { current: { value: 'Test 1' } };
    const setTodos = jest.fn();
    const handleAddTodo = Todomvc.__get__('handleAddTodo');
    handleAddTodo(todoNameRef, setTodos);
    expect(setTodos).toHaveBeenCalledWith([{ id: '1', title: 'Test 1', completed: false }]);
});