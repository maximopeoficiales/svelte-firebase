<script>
  import { onMount } from "svelte";
  import toastr from "toastr";
  import { db } from "./firebase";
  let editStatus = false;
  let inputElement;
  let currentId;
  let tasks = [];
  onMount(async () => {
    await db.collection("tasks").onSnapshot((querySnapshot) => {
      let docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      tasks = [...docs];
      console.log(tasks);
    });
  });
  let task = {
    name: "",
    description: "",
  };
  const editTask = (currenTask) => {
    currentId = currenTask.id;
    task.name = currenTask.name;
    task.description = currenTask.description;
    editStatus = true;
  };
  const deleteTask = async (id) => {
    await db.collection("tasks").doc(id).delete();
    //     console.log(id);
  };
  const updateTask = async () => {
    await db.collection("tasks").doc(currentId).update(task);
    toastr.success("Product Updated Successfully", "", {
      timeOut: 1000,
      progressBar: true,
      positionClass: "toast-bottom-right",
    });
  };
  const addTask = () => {
    db.collection("tasks").doc().set(task);
    task = { name: "", description: "" };
    toastr.success("Product Created Successfully", "", {
      timeOut: 1000,
      progressBar: true,
      positionClass: "toast-bottom-right",
    });
  };
  const handlerSubmit = () => {
    if (!editStatus) {
      addTask();
    } else {
      updateTask();
      editStatus = false;
      currentId = "";
    }
    inputElement.focus();
  };
  const onCancel = () => {
    editStatus = false;
    currentId = "";
    task = { name: "", description: "" };
  };
</script>

<main class="text-center font-monse">
  <h1 class="text-4xl font-bold">My Tasks</h1>
  <div class="container w-1/3 p-2 mx-auto">
    <form on:submit|preventDefault={handlerSubmit}>
      <label class="block my-2 text-left">
        <span class="text-gray-700 ">Task</span>
        <input
          class="block w-full mt-1 form-input"
          placeholder="Write Task"
          bind:this={inputElement}
          bind:value={task.name} />
      </label>
      <label class="block my-2 text-left">
        <span class="text-gray-700 ">Description</span>
        <input
          class="block w-full mt-1 form-input"
          placeholder="Write Description"
          bind:value={task.description} />
      </label>
      <button
        class="block w-full px-2 py-4 my-2 text-xl font-bold text-white bg-black rounded-lg ">
        {!editStatus ? 'Enviar' : 'Actualizar'}
      </button>
      {#if editStatus}
        <button
          on:click={() => {
            onCancel();
          }}
          class="block w-full px-2 py-4 my-2 text-xl font-bold text-white bg-red-500 rounded-lg ">
          Cancelar
        </button>
      {/if}
    </form>
    <h2 class="text-3xl font-semibold">List - Tasks</h2>
    <!-- Tareas -->
    {#each tasks as t,i}
    <article class="my-2 text-center border border-black border-dashed">
          <p>Name: {t.name}</p>
          <p>Description: {t.description}</p>
          <div class="flex justify-between">
               <button on:click={()=>{deleteTask(t.id)}}
        class="block w-full px-1 py-2 m-2 text-sm font-bold text-white bg-red-500 rounded-lg ">
        Eliminar
      </button>
      <button on:click={()=>{editTask(t)}}
        class="block w-full px-1 py-2 m-2 text-sm font-bold text-white bg-green-500 rounded-lg ">
        Editar
      </button>
          </div>
     </article>
     {:else}
          Cargando....
    {/each}
  </div>
</main>
