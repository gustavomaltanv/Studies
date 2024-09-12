import { useState, useEffect, useRef, useMemo, useCallback } from "react"

function App() {

  const inputRef = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);

  const [input, setInput] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>([]);

  const [editTask, setEditTask] = useState({
    enabled: false,
    editableTask: '',
    index: -1
  });

  useEffect(() => {
    const savedTasks = localStorage.getItem('@tasks');
    savedTasks ? setTasks(JSON.parse(savedTasks)) : '';
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
    } else {
      localStorage.setItem('@tasks', JSON.stringify(tasks));
    }
  }, [tasks])


  const handleRegister = useCallback(() => {
    if (!input) {
      alert("please enter a new task");
    } else if (editTask.enabled) {
      handleSaveEdit();
    } else {
      setTasks(e => [...e, input]);
    }
    setInput("");
  }, [input, tasks])

  function handleRemove(item: string) {
    const removeTask = tasks.filter(e => e !== item);
    setTasks(removeTask);
  }

  function handleEdit(item: string, index: number) {
    setInput(item);
    inputRef.current?.focus();
    setEditTask({
      enabled: true,
      editableTask: item,
      index: index
    });
  }

  function handleSaveEdit() {
    const editingTask = [...tasks]
    editingTask[editTask.index] = input;
    setTasks(editingTask);
    setEditTask({
      enabled: false,
      editableTask: '',
      index: -1
    });
  }

  const totalTasks = useMemo(() => tasks.length, [tasks]);

  return (
    <>
      <h1> TASKS </h1>

      <input
        type="text"
        placeholder="new task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        ref={inputRef}
      />
      <button onClick={handleRegister} > {editTask.enabled ? 'Update' : 'Register'} </button>

      <hr />
      <h3> {totalTasks > 0 ? `${totalTasks} tasks:` : ''}  </h3>
      {tasks.map((item, index) => (
        <section key={item}>
          <span>{item}</span>
          <button onClick={() => handleEdit(item, index)} >Edit</button>
          <button onClick={() => handleRemove(item)} >Remove</button>
        </section>
      ))}
    </>
  )
}

export default App
