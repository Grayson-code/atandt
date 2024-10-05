<script lang="ts">
  import {
    createTable,
    Render,
    Subscribe,
    createRender,
  } from "svelte-headless-table";
  import { writable } from "svelte/store";
  import {
    addPagination,
    addSortBy,
    addTableFilter,
    addSelectedRows,
    addHiddenColumns,
  } from "svelte-headless-table/plugins";

  import * as Table from "$lib/components/ui/table";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

  import ArrowUpDown from "lucide-svelte/icons/arrow-up-down";
  import ChevronDown from "lucide-svelte/icons/chevron-down";
  import lucidepencil from "lucide-svelte/icons/pencil";

  import DataTableActions from "./data-table-actions.svelte";
  import DataTableCheckbox from "./data-table-checkbox.svelte";

  export let data;

  type IData = {
    id: string;
    author: string;
    deadline: number;
    name: string;
    of: string;
    priorityOverride: number;
    special: {
      content: string;
      type: string;
    };
    type: string;
  };

  let realData: IData[] = data.items;
  let store = writable(realData);

  const deleteItem = (id: string) => {
    realData = realData.filter((item) => item.id !== id);
    store.set(realData);
  };

  let columns;
  $: {
    store.set(realData);
  }

  const table = createTable(store, {
    page: addPagination({initialPageSize: 5}),
    sort: addSortBy(),
    filter: addTableFilter({
      fn: ({ filterValue, value }) =>
        value.toLowerCase().includes(filterValue.toLowerCase()),
    }),
    hide: addHiddenColumns(),
    select: addSelectedRows(),
  });

  columns = table.createColumns([
    table.column({
      accessor: "id",
      header: (_, { pluginStates }) => {
        const { allPageRowsSelected } = pluginStates.select;
        return createRender(DataTableCheckbox, {
          checked: allPageRowsSelected,
        });
      },
      cell: ({ row }, { pluginStates }) => {
        const { getRowState } = pluginStates.select;
        const { isSelected } = getRowState(row);

        return createRender(DataTableCheckbox, {
          checked: isSelected,
        });
      },
      plugins: {
        sort: {
          disable: true,
        },
        filter: {
          exclude: true,
        },
      },
    }),
    table.column({
      accessor: "name",
      header: "Name",
      plugins: {
        sort: {
          disable: true,
        },
      },
    }),
    table.column({
      accessor: "deadline",
      header: "Due In",
      plugins: {
        filter: {
          exclude: true,
        },
      },
      cell: ({ value }) => {
        const now = Date.now();
        const diff = value - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let displayTime = "";
        let color = "";

        if (days < 3) {
          color = "red";
        } else if (days <= 5) {
          color = "yellow";
        } else if (days <= 10) {
          color = "green";
        }

        if (days > 4) {
          displayTime = `<span>${days}d</span>`;
        } else if (days > 2) {
          displayTime = `<span class="text-yellow-600">${days}d ${hours}h</span>`;
        } else if (days < 1) {
          displayTime =`<span class="text-red-600">${hours}h ${minutes}m</span>`;
        } else if (diff < 0) { 
          displayTime = `<span class="text-red-600">Overdue</span>`;
        } else {
          displayTime = `<span class="text-red-600">${days}d ${hours}h ${minutes}m</span>`;
        }

        return displayTime;
      },
    }),
    table.column({
      accessor: "of",
      header: "Author",
      plugins: {
        filter: {
          exclude: true,
        },
      },
    }),
    table.column({
      accessor: "type",
      header: "Type",
      plugins: {
        filter: {
          exclude: true,
        },
      },
      cell: ({ value }) => {
        // if the type if testpaper then an icon named pencil from lucide will be used
        // else an icon named book will be used
        let v: string;
        if (value == "tp") {
          v = "Testpaper";
        } else if (value == "note") {
          v = "Note Writing";
        } else if (value == "assignment") {
          v = "Assignment";
        } else {
          v = "Event";
        }
        return v;
      },
    }),
    table.column({
      accessor: ({ id }) => id,
      header: "Actions",

      plugins: {
        sort: {
          disable: true,
        },
        filter: {
          exclude: true,
        },
      },
      cell: ({ value }) => {
        // Pass deleteItem function to the actions component
        return createRender(DataTableActions, {
          id: value,
          onDelete: deleteItem,
        });
      },
    }),
  ]);

  const {
    headerRows,
    pageRows,
    tableAttrs,
    tableBodyAttrs,
    pluginStates,
    flatColumns,
    rows,
  } = table.createViewModel(columns);

  const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
  const { filterValue } = pluginStates.filter;
  const { hiddenColumnIds } = pluginStates.hide;
  const { selectedDataIds } = pluginStates.select;
  const ids = flatColumns.map((col) => col.id);
  let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

  $: $hiddenColumnIds = Object.entries(hideForId)
    .filter(([, hide]) => !hide)
    .map(([id]) => id);

  const hidableCols = ["of", "type", "deadline"];
</script>

<div>
  <div class="flex items-center py-4 ">
    <Input
      class="max-w-sm"
      placeholder="Filter Events..."
      type="text"
      bind:value={$filterValue}
    />
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild let:builder>
        <Button variant="outline" class="ml-auto" builders={[builder]}>
          Selected Columns <ChevronDown class="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {#each flatColumns as col}
          {#if hidableCols.includes(col.id)}
            <DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
              {col.header}
            </DropdownMenu.CheckboxItem>
          {/if}
        {/each}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
  <div class="rounded border">
    <Table.Root {...$tableAttrs}>
      <Table.Header>
        {#each $headerRows as headerRow}
          <Subscribe rowAttrs={headerRow.attrs()}>
            <Table.Row>
              {#each headerRow.cells as cell (cell.id)}
                <Subscribe
                  attrs={cell.attrs()}
                  let:attrs
                  props={cell.props()}
                  let:props
                >
                  <Table.Head {...attrs} class="[&:has([role=checkbox])]:pl-3">
                    {#if cell.id == "deadline" || cell.id == "of" || cell.id == "type"}
                      <Button
                        variant="ghost"
                        on:click={props.sort.toggle}
                        class="-ml-5"
                      >
                        <Render of={cell.render()} />
                        <ArrowUpDown class={"ml-2 h-4 w-4"} />
                      </Button>
                    {:else if cell.id == "id"}
                    <div class="-ml-1">
                      <Render of={cell.render()} />
                    </div>

                    {:else}
                      <Render of={cell.render()} />
                    {/if}
                  </Table.Head>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Header>
      <Table.Body {...$tableBodyAttrs}>
        {#each $pageRows as row (row.id)}
          <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
            {#if row.cells}
            <Table.Row
            {...rowAttrs}
            data-state={$selectedDataIds[row.id] && "selected"}
          >                {#each row.cells as cell (cell.id)}
                  <Subscribe attrs={cell.attrs()} let:attrs>
                    <Table.Cell {...attrs}>
                      <div>
                        {#if typeof cell.render() === "string"}
                          <!-- Render the HTML string using the {@html} directive -->
                          {@html cell.render()}
                        {:else}
                          <Render of={cell.render()} />
                        {/if}
                      </div>
                    </Table.Cell>
                  </Subscribe>
                {/each}
              </Table.Row>
            {/if}
          </Subscribe>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
  <div class="flex items-center justify-end space-x-4 py-4">
    <div class="text-muted-foreground flex-1 text-sm">
      {Object.keys($selectedDataIds).length} of{" "}
      {$rows.length} row(s) selected.
    </div>
    <Button
      variant="outline"
      size="sm"
      on:click={() => ($pageIndex = $pageIndex - 1)}
      disabled={!$hasPreviousPage}>Previous</Button
    >
    <Button
      variant="outline"
      size="sm"
      disabled={!$hasNextPage}
      on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
    >
  </div>
</div>
