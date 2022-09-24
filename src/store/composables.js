import { computed } from "vue";
import { useStore } from "vuex";

export const useFilteredJobs = () => {
  const store = useStore();
  return computed(() => store.getters.FILTERED_JOBS);
};

export const useUniqueJobTypes = () => {
  const store = useStore();
  return computed(() => store.getters.UNIQUE_JOB_TYPES);
};

export const useUniqueOrganizations = () => {
  const store = useStore();
  return computed(() => store.getters.UNIQUE_ORGANIZATIONS);
};
