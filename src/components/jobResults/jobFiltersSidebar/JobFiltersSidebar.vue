<template>
  <div
    class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-96"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <action-button text="Clear Filters" type="secondary" />
        </div>
      </div>
      <accordion header="Degree" />
      <job-filters-sidebar-checkbox-group
        header="Job Types"
        :unique-values="UNIQUE_JOB_TYPES"
        mutation="ADD_SELECTED_JOB_TYPES"
      />
      <job-filters-sidebar-checkbox-group
        header="Organizations"
        :unique-values="UNIQUE_ORGANIZATIONS"
        mutation="ADD_SELECTED_ORGANIZATIONS"
      />
    </section>
  </div>
</template>

<script>
import ActionButton from "@/components/shared/ActionButton.vue";
import Accordion from "@/components/shared/Accordion.vue";
import { useUniqueJobTypes, useUniqueOrganizations } from "@/store/composables";
import JobFiltersSidebarCheckboxGroup from "@/components/jobResults/jobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";
export default {
  name: "JobFiltersSidebar",
  components: { ActionButton, Accordion, JobFiltersSidebarCheckboxGroup },
  setup() {
    const UNIQUE_JOB_TYPES = useUniqueJobTypes();
    const UNIQUE_ORGANIZATIONS = useUniqueOrganizations();
    return {
      UNIQUE_ORGANIZATIONS,
      UNIQUE_JOB_TYPES,
    };
  },
};
</script>
