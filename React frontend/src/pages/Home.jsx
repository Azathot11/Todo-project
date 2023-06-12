import React,{ useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editValues, seteditValues] = useState({});
  const [loading, setIsLoading] = useState(false);


  const urlPrefix = "http://localhost:8081";
  const toastId = React.useRef(null);

  const httPromise = () =>
    (toastId.current = toast.loading("loading", { autoClose: false }));
  const dismiss = () => toast.dismiss(toastId.current);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${urlPrefix}/todo/getTodos`);
        if (res) {
          setTodos(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      title: edit ? editValues?.title : "",
      description: edit ? editValues?.description : "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values, onReset) => {
    const loginHandler = async () => {
      setIsLoading(true);
    
      try {
        if (edit) {
          const res = await axios.put(
            `${urlPrefix}/todo/updateTodo/${editValues.id}`,
            {
              title: values.title,
              description: values.description,
              completed: editValues.completed,
            }
          );
          const updatedArray = todos.map((obj) =>
            obj.id === res.data.id
              ? { ...obj, title: res.data.title, description: res.data.description }
              : obj
          );
          setTodos(updatedArray);
          setEdit(false);
          onReset.resetForm();
        } else {
          const res = await axios.post(`${urlPrefix}/todo/create`, values);
          setTodos([res.data, ...todos]);
          onReset.resetForm();
        }
        toast.success("Success", { autoClose: 3000 });
        dismiss();
        setIsLoading(false);
      } catch (err) {
        toast.error("An error occured", { autoClose: 3000 });
        dismiss();
        setIsLoading(false);
      }
    };
      loginHandler();
    },
  });

  const editHandler = (todo) => {
    setEdit(true);
    seteditValues(todo);
  };

  const deleteHandler = async (id) => {
    httPromise()
    try {
      const res = await axios.delete(`${urlPrefix}/todo/delete/${id}`);
      if (res.status === 200) {
        dismiss()
        toast.success("Success", { autoClose: 3000 });
        setTodos(todos.filter(todo => todo.id !== id));
      }
    } catch (err) {
      dismiss()
      console.log(err);
      toast.error("An error occured", { autoClose: 3000 });
    }
  };

  const completed = async (todo) => {
      httPromise()
      const newobj = {
          ...todo,
          completed: !todo.completed,
      };
  
      try {
        const res = await axios.put(
          `${urlPrefix}/todo/updateTodo/${todo.id}`,
          newobj
        );
  
        if (res.status === 200) {
          toast.success("Success", { autoClose: 3000 });
          const updatedArray = todos.map((obj) => {
            if (obj.id === res.data.id) {
              return {
                ...obj,
                title: res.data.title,
                description: res.data.description,
                completed: res.data.completed,
              };
            }
            return obj;
          });
          dismiss()
          setTodos(updatedArray);
        }
      } catch (err) {
        toast.error("An error occured", { autoClose: 3000 });
        console.log(err);
      }
    };

  return (
    <>
      <ToastContainer />
      <div className="w-full h-screen min-h-full p-10 bg-gray-200 flex gap-x-10 ">
        <div className="col-span-1 lg:col-span-6 w-full">
          <h4 className="text-3xl text-gray-700 mb-5">Please enter a todo</h4>
          <form
            onSubmit={formik.handleSubmit}
            className="p-10 rounded-md shadow-md bg-white"
          >
            <div className="mb-6">
              <label className="block mb-3 text-gray-600" htmlFor="">
                Title
              </label>
              <input
                type="text"
                name="title"
                className={`border border-gray-500 rounded-md inline-block py-2 px-3 w-full text-gray-600 tracking-wider focus:border-gray-400 focus:border-2 outline-none ${
                  formik.errors.title &&
                  formik.touched.title &&
                  "border-red-500"
                }`}
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.title && formik.touched.title ? (
                <p className="text-red-500 w-full flex justify-start">
                  {formik.errors.title}
                </p>
              ) : null}
            </div>
            <div className="mb-6">
              <h1 className="block mb-3 text-gray-600" htmlFor="">
                Description
              </h1>
              <textarea
                type="text"
                name="description"
                className={`border border-gray-500 rounded-md inline-block py-2 px-3  text-gray-600 tracking-widest w-full focus:border-gray-400 focus:border-2 outline-none ${
                  formik.errors.description &&
                  formik.touched.description &&
                  "border-red-500"
                }`}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.description && formik.touched.description ? (
                <p className="text-red-500 w-full flex justify-start">
                  {formik.errors.description}
                </p>
              ) : null}
            </div>
            <div className="mb-6 flex flex-wrap -mx-3w-full"></div>
            <div>
              <button
                type="submit"
                className="w-full text-ceenter px-4 py-3 bg-blue-500 rounded-md shadow-md text-white font-semibold"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-span-1 lg:col-span-4 order-first lg:order-last w-full">
          <h4 className="text-3xl text-gray-700 mb-5">Todos</h4>
          <div className=" max-h-[800px] p-10 rounded-md shadow-md bg-white flex flex-col gap-y-5 overflow-y-auto">
            {todos.length === 0 && (
              <div className="shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] p-2 flex flex-col gap-y-5 ">
                <h1 className="text-2xl font-bold my-5 text-center">
                  {" "}
                  Todo list empty
                </h1>
              </div>
            )}
            {todos.length > 0 && (
              <>
                {todos.map((todo) => (
                  <div
                    className="shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] p-2 flex flex-col gap-y-5 py-5 px-5"
                    key={todo.id}
                  >
                    <div className="flex justify-between items-center ">
                      <h1 className="font-bold text-lg capitalize">
                        {todo.title}
                      </h1>
                      <div className="flex items-center gap-4  text-xl cursor-pointer">
                        <button
                          className="bg-purple-400 px-2 p-[2px] rounded text-sm"
                          onClick={() => {
                            completed(todo);
                          }}
                        >
                          {" "}
                          {todo.completed
                            ? "Mark as uncompleted"
                            : "Mark as completed"}
                        </button>
                        <FiEdit
                          className="text-blue-500"
                          onClick={() => {
                            editHandler(todo);
                          }}
                        />
                        <AiOutlineDelete
                          className="text-2xl  text-red-500"
                          onClick={() => {
                            deleteHandler(todo.id);
                          }}
                        />
                      </div>
                    </div>
                    <p>{todo?.description}</p>
                    <p
                      className={`p-1 w-32 text-center ${
                        todo.completed
                          ? " bg-green-200 rounded text-green-500"
                          : " bg-red-200 rounded text-red-500"
                      }`}
                    >
                      {!todo.completed ? "Uncompleted" : "Completed"}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
