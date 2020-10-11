<script>
  import Index from "./Index.svelte";
</script>

<style global>
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap");
  /* purgecss start ignore */
  @tailwind base;
  @tailwind components;
  /* purgecss end ignore */
  @tailwind utilities;
  /* podemos junstar clases para crear componentes */
  a:hover {
    text-decoration: none;
  }
  a {
    text-decoration: none;
  }
  a:visited {
    color: white;
  }
</style>

<Index />
