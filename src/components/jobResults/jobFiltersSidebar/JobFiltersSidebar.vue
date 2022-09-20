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
      <accordion header="Job Types">
        <div class="mt-5">
          <fieldset>
            <ul class="flex flex-row flex-wrap">
              <li
                v-for="jobType in UNIQUE_JOB_TYPES"
                :key="jobType"
                class="w-1/2 h-8"
              >
                <input
                  :id="jobType"
                  v-model="selectedJobTypes"
                  :value="jobType"
                  type="checkbox"
                  class="m-3"
                  :data-test="jobType"
                  @change="selectJobTypes"
                />
                <label :for="jobType" data-test="jobType">{{ jobType }}</label>
              </li>
            </ul>
          </fieldset>
        </div>
      </accordion>
      <accordion header="Organizations" data-test="accordion-organizations">
        <div class="mt-5">
          <fieldset>
            <ul class="flex flex-row flex-wrap">
              <li
                v-for="organization in UNIQUE_ORGANIZATIONS"
                :key="organization"
                class="w-1/2 h-8"
              >
                <input
                  :id="organization"
                  v-model="selectedOrganizations"
                  :value="organization"
                  type="checkbox"
                  class="m-3"
                  :data-test="organization"
                  @change="selectOrganizations"
                />
                <label :for="organization" data-test="organization">{{
                  organization
                }}</label>
              </li>
            </ul>
          </fieldset>
        </div>
      </accordion>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import ActionButton from "@/components/shared/ActionButton.vue";
import Accordion from "@/components/shared/Accordion.vue";

export default {
  name: "JobFiltersSidebar",
  components: { ActionButton, Accordion },
  data() {
    return {
      selectedOrganizations: [],
      selectedJobTypes: [],
    };
  },
  computed: {
    ...mapGetters(["UNIQUE_ORGANIZATIONS", "UNIQUE_JOB_TYPES"]),
  },
  methods: {
    ...mapMutations(["ADD_SELECTED_ORGANIZATIONS", "ADD_SELECTED_JOB_TYPES"]),
    selectOrganizations() {
      this.ADD_SELECTED_ORGANIZATIONS(this.selectedOrganizations);
      this.$router.push({ name: "jobs" });
    },
    selectJobTypes() {
      this.ADD_SELECTED_JOB_TYPES(this.selectedJobTypes);
      this.$router.push({ name: "jobs" });
    },
  },
};
</script>
