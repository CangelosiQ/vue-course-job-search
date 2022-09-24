<template>
  <accordion
    :header="header"
    :data-test="'accordion-group-checkboxes-' + header"
  >
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="value in uniqueValues" :key="value" class="w-1/2 h-8">
            <input
              :id="value"
              v-model="selectedValues"
              :value="value"
              type="checkbox"
              class="m-3"
              :data-test="value"
              @change="selectValues"
            />
            <label :for="value" :data-test="'checkbox-label-' + header">{{
              value
            }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </accordion>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import Accordion from "@/components/shared/Accordion.vue";

export default {
  name: "JobFiltersSidebarCheckboxGroup",
  components: { Accordion },
  props: {
    header: {
      type: String,
      required: true,
    },
    uniqueValues: {
      type: Set,
      required: true,
    },
    mutation: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const selectedValues = ref([]);

    const selectValues = () => {
      store.commit(props.mutation, selectedValues.value);
      router.push({ name: "jobs" });
    };
    return {
      selectedValues,
      selectValues,
    };
  },
};
</script>
