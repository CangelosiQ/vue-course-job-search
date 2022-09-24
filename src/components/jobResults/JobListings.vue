<template>
  <main class="flex-auto p-8 bg-brand-gray-2">
    <ol>
      <job-listing
        v-for="job in displayedJobs"
        :key="job.id"
        :job="job"
        data-test="job-listing"
      />
    </ol>
    <div class="mt-8 mx-auto">
      <div class="flex flex-row flex-nowrap">
        <p class="text-sm flex-grow">Page {{ currentPage }}</p>
        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            :to="{ name: 'jobs', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            data-test="previous-page-link"
            >Previous</router-link
          >

          <router-link
            v-if="nextPage"
            :to="{ name: 'jobs', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            data-test="next-page-link"
            >Next</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import JobListing from "@/components/jobResults/JobListing.vue";
import { FETCH_JOBS } from "@/store";
import { useFilteredJobs } from "@/store/composables";
export default {
  name: "JobListings",
  components: { JobListing },
  setup() {
    const store = useStore();
    const route = useRoute();
    const fetchJobs = () => store.dispatch(FETCH_JOBS);
    const currentPage = computed(() =>
      Number.parseInt(route.query.page || "1")
    );
    const previousPage = computed(() => {
      const previousPage = currentPage.value - 1;
      const firstPage = 1;
      return previousPage >= firstPage ? previousPage : undefined;
    });
    const FILTERED_JOBS = useFilteredJobs();
    const nextPage = computed(() => {
      const _nextPage = currentPage.value + 1;
      const lastPage = Math.ceil(FILTERED_JOBS.value.length / 10);
      return _nextPage > lastPage ? undefined : _nextPage;
    });
    const displayedJobs = computed(() => {
      return FILTERED_JOBS.value.slice(
        (currentPage.value - 1) * 10,
        currentPage.value * 10
      );
    });
    onMounted(fetchJobs);
    return {
      FILTERED_JOBS,
      previousPage,
      nextPage,
      currentPage,
      displayedJobs,
    };
  },
};
</script>
