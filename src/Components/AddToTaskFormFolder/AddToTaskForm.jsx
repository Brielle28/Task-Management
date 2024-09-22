import React from "react";

const TaskForm = () => {
  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          {/* header  */}

          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:text-blue-500">
              ✕
            </button>
          </form>
          {/* form  */}
          <form className="flex flex-col items-start justify-center gap-3 px-5 mt-5">
            <h3 className="font-bold text-lg text-blue-600">Add a Task</h3>
            <div className="flex flex-row items-start justify-between w-full p-">
              <label className="input input-bordered flex flex-col items-start w-[45%] pl-2">
                Start date
                <input
                  type="datetime-local"
                  className="grow text-[12px] appearance-none"
                />
              </label>
              <label className="input input-bordered flex flex-col items-start w-[45%] pl-2">
                End date
                <input
                  type="datetime-local"
                  className="grow text-[12px] appearance-none"
                />
              </label>
            </div>
            <label className="input input-bordered flex items-center gap-2 w-full">
              {/* Name */}
              <input
                type="text"
                className="grow"
                placeholder="Name of the task"
              />
            </label>
            <label className="form-control w-full">
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Description about the task"
              ></textarea>
            </label>
            <button className="w-full bg-blue-500 btn rounded-[10px] text-white font-roboto font-semibold hover:bg-blue-400 sm:btn-sm md:btn-md lg:btn-lg">
              {" "}
              Submit{" "}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default TaskForm;
