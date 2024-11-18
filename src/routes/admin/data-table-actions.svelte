<script lang="ts">
  import Ellipsis from "lucide-svelte/icons/ellipsis";
  import Dustbin from "lucide-svelte/icons/trash-2"
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { Button } from "$lib/components/ui/button";
  import { doc, deleteDoc } from "firebase/firestore";
  import {db} from "$lib/firebase";


  export let id;
  export let onDelete;

  const handleDelete = async () => {
    onDelete(id);  // Call the delete function with the item ID
    console.log("ID: ", id);
    await deleteDoc(doc(db, "events", id))
  };
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button
      variant="ghost"
      builders={[builder]}
      size="icon"
      class="relative h-8 w-8 p-0"
    >
      <span class="sr-only">Open menu</span>
      <Ellipsis class="h-4 w-4" />
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Item on:click={handleDelete} class="text-red-600">
        <Dustbin class="h-4 w-4 mr-2" />
        Delete
      </DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>Under Construction</DropdownMenu.Item>
    <DropdownMenu.Item>Under Construction</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
