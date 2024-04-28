<script>
import DataManager from "../../shared/components/data-manager.component.vue";
import TutorialItemCreateAndEditDialog from "../components/tutorial-item-create-and-edit-dialog.component.vue";
import {Tutorial} from "../model/tutorial.entity.js";
import {TutorialsApiService} from "../services/tutorials-api.service.js";

export default {
  name: "tutorial-management",
  components: {TutorialItemCreateAndEditDialog, DataManager},
  data() {
    return {
      title: { singular: 'Tutorial', plural: 'Tutorials' },
      tutorials: [],
      tutorial: {},
      selectedTutorials: [],
      statuses: [{label: 'Published', value: 'published'}, {label: 'Unpublished', value: 'unpublished'}],
      tutorialService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false
    }
  },
  methods: {

    //#region Helper Methods

    notifySuccessfulAction(message) {
      this.$toast.add({severity: "success", summary: "Success", detail: message, life: 3000,});
    },

    // Get the severity color according to status
    getSeverity(status) {
      switch (status) {
        case 'Published': return 'success';
        case 'Unpublished': return 'info';
        default:  return null;
      }
    },

    findIndexById(id) {
      return this.tutorials.findIndex((tutorial) => tutorial.id === id);
    },

    //#endregion Helper Methods

    //#region Data Manager Event Handlers

    onNewItemEventHandler() {
      this.tutorial = {};
      this.submitted = false;
      this.isEdit = false;
      this.createAndEditDialogIsVisible = true;
    },

    onEditItemEventHandler(item) {
      this.tutorial = item;
      this.submitted = false;
      this.isEdit = true;
      this.createAndEditDialogIsVisible = true;
    },

    onDeleteItemEventHandler(item) {
      this.tutorial = item;
      this.deleteTutorial();
    },

    onDeleteSelectedItemsEventHandler(selectedItems) {
      this.selectedTutorials = selectedItems;
      this.deleteSelectedTutorials();
    },

    //#endregion Data Manager Event Handlers

    //#region Tutorial Item Create and Edit Dialog Event Handlers

    onCanceledEventHandler() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },

    onSavedEventHandler(item) {
      this.submitted = true;
      if (this.tutorial.title.trim()) {
        if (item.id) {
          this.updateTutorial();
        } else {
          this.createTutorial();
        }
      }
      this.createAndEditDialogIsVisible = false;
      this.isEdit = false;
    },

    //#endregion Data Manager Event Handlers

    //#region Data Actions

    // Create a new item

    createTutorial() {
      this.tutorial.id = 0;
      this.tutorial = Tutorial.fromDisplayableTutorial(this.tutorial);
      this.tutorialsService.create(this.tutorial)
          .then((response) => {
            this.tutorial = Tutorial.toDisplayableTutorial(response.data);
            this.tutorials.push(this.tutorial);
            this.notifySuccessfulAction("Tutorial Created");
          });
    },

    // Update an existing item

    updateTutorial() {
      this.tutorial = Tutorial.fromDisplayableTutorial(this.tutorial);
      this.tutorialsService
          .update(this.tutorial.id, this.tutorial)
          .then((response) => {
            this.tutorials[this.findIndexById(response.data.id)] =
                Tutorial.toDisplayableTutorial(response.data);
            this.notifySuccessfulAction("Tutorial Updated");
          });
    },

    // Delete a item

    deleteTutorial() {
      this.tutorialsService.delete(this.tutorial.id)
          .then(() => {
            this.tutorials = this.tutorials.filter((t) => t.id !== this.tutorial.id);
            this.tutorial = {};
            this.notifySuccessfulAction("Tutorial Deleted");
          });
    },

    // Delete selected tutorials

    deleteSelectedTutorials() {
      this.selectedTutorials.forEach((tutorial) => {
        this.tutorialsService.delete(tutorial.id).then(() => {
          this.tutorials = this.tutorials.filter((t) => t.id !== this.tutorial.id);
        });
      });
      this.notifySuccessfulAction("Tutorials Deleted");
    }

    //#endregion Data Actions
  },
  created() {
    this.tutorialsService = new TutorialsApiService();

    this.tutorialsService.getAll().then((response) => {
      console.log(response.data);
      let tutorials = response.data;
      this.tutorials = tutorials.map((tutorial) => Tutorial.toDisplayableTutorial(tutorial));
    });
  }
}
</script>

<template>
  <div class="w-full">
    <!-- Tutorial Data Manager -->
    <data-manager
        :title=title
        v-bind:items="tutorials"
        v-on:new-item="onNewItemEventHandler"
        v-on:edit-item="onEditItemEventHandler($event)"
        v-on:delete-item="onDeleteItemEventHandler($event)"
        v-on:delete-selected-items="onDeleteSelectedItemsEventHandler($event)">
      <template #custom-columns>
        <pv-column :sortable="true" field="id"          header="Id"           style="min-width: 12rem"/>
        <pv-column :sortable="true" field="title"       header="Title"        style="min-width: 16rem"/>
        <pv-column :sortable="true" field="description" header="Description"  style="min-width: 16rem"/>
        <pv-column :sortable="true" field="status"      header="Status"       style="min-width: 16rem">
          <template #body="slotProps">
            <pv-tag :severity="getSeverity(slotProps.data.status)" :value="slotProps.data.status"/>
          </template>
        </pv-column>
      </template>
    </data-manager>
    <!-- Tutorial Item Create and Edit Dialog -->
    <tutorial-item-create-and-edit-dialog
        :statuses="statuses"
        :item="tutorial"
        :edit="isEdit"
        :visible="createAndEditDialogIsVisible"
        v-on:canceled="onCanceledEventHandler"
        v-on:saved="onSavedEventHandler($event)"/>

  </div>

</template>

<style scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media screen and (max-width: 960px) {
  :deep(.p-toolbar) {
    flex-wrap: wrap;

  }
}

@media (min-width: 1024px) {
  .tutorials {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>